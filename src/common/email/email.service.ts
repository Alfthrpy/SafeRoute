import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;
  private readonly from: string;

  constructor(configService: ConfigService) {
    this.resend = new Resend(configService.getOrThrow<string>('RESEND_API_KEY'));
    this.from = configService.getOrThrow<string>('MAIL_FROM');
  }

  /**
   * Pengirim email generik. `body` berisi HTML.
   * `text` (opsional) adalah versi teks biasa untuk aplikasi email yang tidak menampilkan HTML.
   */
  async sendEmail(
    to: string,
    subject: string,
    body: string,
    text?: string,
  ): Promise<void> {
    try {
      // Resend mengembalikan { data, error }, dan juga dapat gagal pada level jaringan.
      const { data, error } = await this.resend.emails.send({
        from: this.from,
        to,
        subject,
        html: body,
        ...(text && { text }),
      });

      if (error) {
        throw new Error(`${error.name} - ${error.message}`);
      }

      this.logger.log(`Email terkirim (id: ${data?.id})`);
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : 'Unknown email provider error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Gagal mengirim email: ${detail}`, stack);
      throw new InternalServerErrorException('Email belum bisa dikirim.');
    }
  }

  /**
   * Email "Lupa kata sandi".
   * `resetUrl` sudah berisi token, contoh: https://app.saferoute.id/reset-password?token=xxxx
   */
  async sendForgotPasswordEmail(
    to: string,
    firstName: string,
    resetUrl: string,
    expiresInMinutes = 30,
  ): Promise<void> {
    await this.sendEmail(
      to,
      'Buat kata sandi baru untuk SafeRoute',
      this.buildForgotPasswordHtml(firstName, resetUrl, expiresInMinutes),
      this.buildForgotPasswordText(firstName, resetUrl, expiresInMinutes),
    );
  }

  // ---------- Template ----------

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private buildForgotPasswordText(
    firstName: string,
    resetUrl: string,
    expiresInMinutes: number,
  ): string {
    return [
      `Halo, ${firstName}!`,
      '',
      'Kami menerima permintaan untuk membuat kata sandi baru untuk akun SafeRoute-mu.',
      'Buka tautan ini untuk membuatnya:',
      resetUrl,
      '',
      `Tautan ini berlaku ${expiresInMinutes} menit dan hanya bisa dipakai satu kali.`,
      '',
      'Bukan kamu yang meminta? Abaikan saja email ini. Kata sandimu tidak akan berubah.',
      'Minta orang tua atau wali menemanimu ya.',
      '',
      '— SafeRoute',
    ].join('\n');
  }

  private buildForgotPasswordHtml(
    firstName: string,
    resetUrl: string,
    expiresInMinutes: number,
  ): string {
    const name = this.escapeHtml(firstName);
    const url = this.escapeHtml(resetUrl);

    const headline =
      "font-family:'Fredoka','Trebuchet MS','Segoe UI',Arial,sans-serif;";
    const body =
      "font-family:'Nunito','Segoe UI',Arial,sans-serif;";

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>Buat kata sandi baru</title>
  <!-- Font hanya tampil di aplikasi email yang mendukung; lainnya memakai font cadangan -->
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#F9FAFB;">
  <!-- Teks pratinjau (muncul di daftar inbox) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Ketuk tombol untuk membuat kata sandi baru. Berlaku ${expiresInMinutes} menit.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F9FAFB;">
    <tr>
      <td align="center" style="padding:24px 16px;">

        <!-- Kartu utama (efek chunky: border bawah tebal) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;background-color:#FFFFFF;border:2px solid #E5E7EB;border-bottom:6px solid #D1D5DB;border-radius:28px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#2563EB;padding:28px 24px;border-radius:26px 26px 0 0;">
              <div style="${headline}font-size:28px;line-height:1.25;font-weight:700;color:#FFFFFF;">
                 SafeRoute
              </div>
              <div style="${body}font-size:16px;line-height:1.5;font-weight:600;color:#FFFFFF;padding-top:4px;">
                Cari sekolah, lihat jalannya.
              </div>
            </td>
          </tr>

          <!-- Isi -->
          <tr>
            <td style="padding:32px 24px 8px 24px;" align="center">
              <!-- Lingkaran ikon kuning -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" valign="middle" width="72" height="72"
                      style="width:72px;height:72px;background-color:#FACC15;border:3px solid #92400E;border-radius:36px;font-size:34px;line-height:72px;">
                    🔑
                  </td>
                </tr>
              </table>

              <h1 style="${headline}margin:20px 0 8px 0;font-size:28px;line-height:1.25;font-weight:700;color:#1F2937;">
                Lupa kata sandi? Tenang ya!
              </h1>
              <p style="${body}margin:0 0 8px 0;font-size:18px;line-height:1.6;font-weight:700;color:#1F2937;">
                Halo, ${name}!
              </p>
              <p style="${body}margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#4B5563;">
                Kami menerima permintaan untuk membuat kata sandi baru.
                Ketuk tombol di bawah ini ya.
              </p>

              <!-- Tombol utama -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${url}" target="_blank"
                       style="${headline}display:block;max-width:360px;background-color:#2563EB;color:#FFFFFF;font-size:18px;line-height:24px;font-weight:600;text-decoration:none;text-align:center;padding:16px 24px;border-radius:20px;border-bottom:5px solid #1D4ED8;">
                      🔒&nbsp; Buat kata sandi baru
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Kartu info -->
          <tr>
            <td style="padding:24px 24px 8px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#EFF6FF;border:2px solid #1D4ED8;border-radius:20px;">
                <tr>
                  <td style="padding:16px;${body}font-size:14px;line-height:1.5;font-weight:600;color:#1F2937;">
                    ℹ️&nbsp; Tombol ini berlaku <strong>${expiresInMinutes} menit</strong> dan hanya bisa dipakai satu kali.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bukan kamu? -->
          <tr>
            <td style="padding:16px 24px 8px 24px;">
              <p style="${body}margin:0 0 8px 0;font-size:16px;line-height:1.6;color:#1F2937;">
                <strong>Bukan kamu yang meminta?</strong> Abaikan saja email ini.
                Kata sandimu tidak akan berubah.
              </p>
              <p style="${body}margin:0;font-size:16px;line-height:1.6;color:#4B5563;">
                Minta orang tua atau wali menemanimu ya.
              </p>
            </td>
          </tr>

          <!-- Tautan cadangan -->
          <tr>
            <td style="padding:16px 24px 28px 24px;">
              <p style="${body}margin:0 0 4px 0;font-size:14px;line-height:1.5;font-weight:600;color:#4B5563;">
                Tombolnya tidak bisa diketuk? Salin tautan ini ke browser:
              </p>
              <p style="${body}margin:0;font-size:14px;line-height:1.5;word-break:break-all;">
                <a href="${url}" target="_blank" style="color:#1D4ED8;text-decoration:underline;">${url}</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:16px 8px;${body}font-size:14px;line-height:1.5;color:#4B5563;">
              Email ini dikirim otomatis oleh SafeRoute. Mohon jangan dibalas.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}