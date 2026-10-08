import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@common/prisma/prisma.service';
import { PasswordUtil } from '@common/utils/password.util';
import { LoginDto } from './core/dto/login.dto';
import { RegisterDto } from './core/dto/register.dto';
import { AuthResponseDto } from './core/dto/auth-response.dto';
import { JwtPayload } from './core/interfaces/jwt-payload.interface';
import { EmailService } from '@common/email/email.service';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async login(loginDto: LoginDto): Promise<Partial<AuthResponseDto>> {
    const { email, password } = loginDto;

    // Find user with position and permissions
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        position: {
          include: {
            position_permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await PasswordUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Build permissions array
    const permissions = user.position.position_permissions.map(
      (pp) => pp.permission.name,
    );

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      positionId: user.position.id,
      positionName: user.position.name,
      permissions,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        position: {
          id: user.position.id,
          name: user.position.name,
        },
        permissions,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, first_name, last_name, position_id } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Validate position exists
    const position = await this.prisma.position.findUnique({
      where: { id: position_id },
      include: {
        position_permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!position) {
      throw new BadRequestException('Invalid position ID');
    }

    // Hash password
    const hashedPassword = await PasswordUtil.hash(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        position_id,
      },
      include: {
        position: {
          include: {
            position_permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    // Build permissions array
    const permissions = user.position.position_permissions.map(
      (pp) => pp.permission.name,
    );

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      positionId: user.position.id,
      positionName: user.position.name,
      permissions,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        position: {
          id: user.position.id,
          name: user.position.name,
        },
        permissions,
      },
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const emailExists = await this.prisma.user.findUnique({ where: { email } });
    if (!emailExists) {
      return;
    }

    const resetToken = randomBytes(32).toString('hex');
    const hashedResetToken = this.hashResetToken(resetToken);
    const frontendUrl = this.configService
      .getOrThrow<string>('FRONTEND_URL')
      .replace(/\/+$/, '');
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    await this.prisma.resetToken.create({
      data: {
        user_id: emailExists.id,
        token: hashedResetToken,
        expires_at: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    try {
      await this.emailService.sendForgotPasswordEmail(
        emailExists.email,
        emailExists.first_name,
        resetUrl,
        60,
      );
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }

      try {
        await this.prisma.resetToken.deleteMany({
          where: { token: hashedResetToken },
        });
      } catch (cleanupError) {
        const detail =
          cleanupError instanceof Error
            ? cleanupError.message
            : 'Unknown database error';
        const stack =
          cleanupError instanceof Error ? cleanupError.stack : undefined;
        this.logger.error(
          `Failed to remove unsent password reset token: ${detail}`,
          stack,
        );
      }
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = this.hashResetToken(token);
    const existingToken = await this.prisma.resetToken.findFirst({
      where: {
        token: hashedToken,
      },
      select: { id: true, user_id: true, expires_at: true },
    });

    if (!existingToken || existingToken.expires_at <= new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await PasswordUtil.hash(newPassword);

    await this.prisma.$transaction(async (transaction) => {
      const claimedToken = await transaction.resetToken.deleteMany({
        where: {
          id: existingToken.id,
          token: hashedToken,
          expires_at: { gt: new Date() },
        },
      });

      if (claimedToken.count !== 1) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      await transaction.user.update({
        where: { id: existingToken.user_id },
        data: { password: hashedPassword },
      });

      await transaction.resetToken.deleteMany({
        where: { user_id: existingToken.user_id },
      });
    });
  }

  private hashResetToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
