/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts"
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const env_validation_1 = __webpack_require__(/*! ./config/env.validation */ "./src/config/env.validation.ts");
const database_config_1 = __importDefault(__webpack_require__(/*! ./config/database.config */ "./src/config/database.config.ts"));
const swagger_config_1 = __importDefault(__webpack_require__(/*! ./config/swagger.config */ "./src/config/swagger.config.ts"));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_config_1 = __importDefault(__webpack_require__(/*! ./config/app.config */ "./src/config/app.config.ts"));
const jwt_config_1 = __importDefault(__webpack_require__(/*! ./config/jwt.config */ "./src/config/jwt.config.ts"));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transform_interceptor_1 = __webpack_require__(/*! ./common/interceptors/transform.interceptor */ "./src/common/interceptors/transform.interceptor.ts");
const logging_interceptor_1 = __webpack_require__(/*! ./common/interceptors/logging.interceptor */ "./src/common/interceptors/logging.interceptor.ts");
const http_exception_filter_1 = __webpack_require__(/*! ./common/filters/http-exception.filter */ "./src/common/filters/http-exception.filter.ts");
const permissions_guard_1 = __webpack_require__(/*! ./common/guards/permissions.guard */ "./src/common/guards/permissions.guard.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const prisma_module_1 = __webpack_require__(/*! ./common/prisma/prisma.module */ "./src/common/prisma/prisma.module.ts");
const health_module_1 = __webpack_require__(/*! ./modules/health/health.module */ "./src/modules/health/health.module.ts");
const users_module_1 = __webpack_require__(/*! ./modules/users/users.module */ "./src/modules/users/users.module.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./src/modules/auth/auth.module.ts");
const layers_module_1 = __webpack_require__(/*! ./modules/layers/layers.module */ "./src/modules/layers/layers.module.ts");
const schools_module_1 = __webpack_require__(/*! ./modules/schools/schools.module */ "./src/modules/schools/schools.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: env_validation_1.validationSchema,
                load: [app_config_1.default, database_config_1.default, jwt_config_1.default, swagger_config_1.default],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            health_module_1.HealthModule,
            layers_module_1.LayersModule,
            schools_module_1.SchoolsModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_guard_1.PermissionsGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);


/***/ },

/***/ "./src/common/constants/permissions.constant.ts"
/*!******************************************************!*\
  !*** ./src/common/constants/permissions.constant.ts ***!
  \******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    USER: {
        VIEW: 'VIEW_USER',
        ADD: 'ADD_USER',
        UPDATE: 'UPDATE_USER',
        DELETE: 'DELETE_USER',
        MANAGE_PERMISSION: 'MANAGE_USER_PERMISSION',
        CHANGE_POSITION: 'CHANGE_USER_POSITION',
    },
    POSITION: {
        VIEW: 'VIEW_POSITION',
        ADD: 'ADD_POSITION',
        UPDATE: 'UPDATE_POSITION',
        DELETE: 'DELETE_POSITION',
    },
    PERMISSION: {
        VIEW: 'VIEW_PERMISSION',
        ADD: 'ADD_PERMISSION',
        UPDATE: 'UPDATE_PERMISSION',
        DELETE: 'DELETE_PERMISSION',
    },
    SCHOOL: {
        VIEW: 'VIEW_SCHOOL',
    },
    LAYER: {
        VIEW: 'VIEW_LAYER',
        ADD: 'ADD_LAYER',
        UPDATE: 'UPDATE_LAYER',
        DELETE: 'DELETE_LAYER',
    }
};


/***/ },

/***/ "./src/common/decorators/api-response.decorator.ts"
/*!*********************************************************!*\
  !*** ./src/common/decorators/api-response.decorator.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiSuccessArrayResponse = exports.ApiSuccessResponse = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_response_dto_1 = __webpack_require__(/*! @common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ApiSuccessResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_response_dto_1.ApiResponseDto, model), (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(api_response_dto_1.ApiResponseDto) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)(model),
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiSuccessResponse = ApiSuccessResponse;
const ApiSuccessArrayResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(api_response_dto_1.ApiResponseDto, model), (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(api_response_dto_1.ApiResponseDto) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiSuccessArrayResponse = ApiSuccessArrayResponse;


/***/ },

/***/ "./src/common/decorators/permissions.decorator.ts"
/*!********************************************************!*\
  !*** ./src/common/decorators/permissions.decorator.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permissions = exports.PERMISSIONS_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.PERMISSIONS_KEY = 'permissions';
const Permissions = (...permissions) => (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions);
exports.Permissions = Permissions;


/***/ },

/***/ "./src/common/decorators/public.decorator.ts"
/*!***************************************************!*\
  !*** ./src/common/decorators/public.decorator.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ },

/***/ "./src/common/dto/api-response.dto.ts"
/*!********************************************!*\
  !*** ./src/common/dto/api-response.dto.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class ApiResponseDto {
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], ApiResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Operation successful' }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "errors", void 0);


/***/ },

/***/ "./src/common/dto/pagination.dto.ts"
/*!******************************************!*\
  !*** ./src/common/dto/pagination.dto.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginatedResponseDto = exports.PaginationDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class PaginatedResponseDto {
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], PaginatedResponseDto.prototype, "meta", void 0);


/***/ },

/***/ "./src/common/filters/http-exception.filter.ts"
/*!*****************************************************!*\
  !*** ./src/common/filters/http-exception.filter.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                message = exceptionResponse.message || exception.message;
                errors = exceptionResponse.errors || null;
            }
            else {
                message = exceptionResponse;
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        this.logger.error(`${request.method} ${request.url} - Status: ${status} - Message: ${message}`, exception instanceof Error ? exception.stack : undefined);
        const errorResponse = {
            statusCode: status,
            message,
            data: null,
            errors,
        };
        response.status(status).json(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);


/***/ },

/***/ "./src/common/guards/jwt-auth.guard.ts"
/*!*********************************************!*\
  !*** ./src/common/guards/jwt-auth.guard.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const public_decorator_1 = __webpack_require__(/*! @common/decorators/public.decorator */ "./src/common/decorators/public.decorator.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Invalid or expired token');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ },

/***/ "./src/common/guards/permissions.guard.ts"
/*!************************************************!*\
  !*** ./src/common/guards/permissions.guard.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionsGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const permissions_decorator_1 = __webpack_require__(/*! @common/decorators/permissions.decorator */ "./src/common/decorators/permissions.decorator.ts");
const public_decorator_1 = __webpack_require__(/*! @common/decorators/public.decorator */ "./src/common/decorators/public.decorator.ts");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const requiredPermissions = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const hasPermission = requiredPermissions.every((permission) => user.permissions.includes(permission));
        if (!hasPermission) {
            throw new common_1.ForbiddenException(`You do not have the required permissions: ${requiredPermissions.join(', ')}`);
        }
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], PermissionsGuard);


/***/ },

/***/ "./src/common/interceptors/logging.interceptor.ts"
/*!********************************************************!*\
  !*** ./src/common/interceptors/logging.interceptor.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, user } = request;
        const now = Date.now();
        const userId = user?.userId || 'anonymous';
        this.logger.log(`→ [${method}] ${url} - User: ${userId} ${Object.keys(body || {}).length > 0 ? `- Body: ${JSON.stringify(body)}` : ''}`);
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const responseTime = Date.now() - now;
                this.logger.log(`← [${method}] ${url} - ${responseTime}ms - User: ${userId}`);
            },
            error: (error) => {
                const responseTime = Date.now() - now;
                this.logger.error(`← [${method}] ${url} - ${responseTime}ms - User: ${userId} - Error: ${error.message}`);
            },
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);


/***/ },

/***/ "./src/common/interceptors/transform.interceptor.ts"
/*!**********************************************************!*\
  !*** ./src/common/interceptors/transform.interceptor.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data && typeof data === 'object' && 'statusCode' in data && 'message' in data) {
                return data;
            }
            let message = 'Operation successful';
            switch (request.method) {
                case 'POST':
                    message = 'Resource created successfully';
                    response.status(common_1.HttpStatus.CREATED);
                    break;
                case 'PUT':
                case 'PATCH':
                    message = 'Resource updated successfully';
                    break;
                case 'DELETE':
                    message = 'Resource deleted successfully';
                    break;
                case 'GET':
                    message = 'Data retrieved successfully';
                    break;
            }
            return {
                statusCode: response.statusCode || common_1.HttpStatus.OK,
                message,
                data,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ },

/***/ "./src/common/prisma/prisma.module.ts"
/*!********************************************!*\
  !*** ./src/common/prisma/prisma.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./src/common/prisma/prisma.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ },

/***/ "./src/common/prisma/prisma.service.ts"
/*!*********************************************!*\
  !*** ./src/common/prisma/prisma.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const adapter_pg_1 = __webpack_require__(/*! @prisma/adapter-pg */ "@prisma/adapter-pg");
const pg_1 = __webpack_require__(/*! pg */ "pg");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        const connectionString = process.env.DATABASE_URL;
        const pool = new pg_1.Pool({ connectionString });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({
            adapter,
            log: [
                { level: 'error', emit: 'stdout' },
                { level: 'warn', emit: 'stdout' },
            ],
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log('✅ Database connected successfully');
        if (process.env.NODE_ENV === 'development') {
            this.$on('query', (e) => {
                this.logger.debug(`Query: ${e.query}`);
                this.logger.debug(`Duration: ${e.duration}ms`);
            });
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database disconnected');
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Cannot clean database in production');
        }
        const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');
        return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ },

/***/ "./src/common/utils/password.util.ts"
/*!*******************************************!*\
  !*** ./src/common/utils/password.util.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordUtil = void 0;
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
class PasswordUtil {
    static async hash(password) {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
    static async compare(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}
exports.PasswordUtil = PasswordUtil;
PasswordUtil.SALT_ROUNDS = 10;


/***/ },

/***/ "./src/config/app.config.ts"
/*!**********************************!*\
  !*** ./src/config/app.config.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    name: process.env.APP_NAME,
    apiPrefix: process.env.API_PREFIX || 'api',
    corsOrigin: process.env.CORS_ORIGIN || '*',
}));


/***/ },

/***/ "./src/config/database.config.ts"
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('database', () => ({
    url: process.env.DATABASE_URL,
}));


/***/ },

/***/ "./src/config/env.validation.ts"
/*!**************************************!*\
  !*** ./src/config/env.validation.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validationSchema = void 0;
const Joi = __importStar(__webpack_require__(/*! joi */ "joi"));
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    PORT: Joi.number().default(3000),
    APP_NAME: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default('7d'),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRATION: Joi.string().default('30d'),
    CORS_ORIGIN: Joi.string().default('*'),
    API_PREFIX: Joi.string().default('api'),
    SWAGGER_ENABLED: Joi.boolean().default(true),
    SWAGGER_PATH: Joi.string().default('api-docs'),
});


/***/ },

/***/ "./src/config/jwt.config.ts"
/*!**********************************!*\
  !*** ./src/config/jwt.config.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
}));


/***/ },

/***/ "./src/config/swagger.config.ts"
/*!**************************************!*\
  !*** ./src/config/swagger.config.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('swagger', () => ({
    enabled: process.env.SWAGGER_ENABLED === 'true',
    path: process.env.SWAGGER_PATH || 'docs',
}));


/***/ },

/***/ "./src/modules/auth/auth.module.ts"
/*!*****************************************!*\
  !*** ./src/modules/auth/auth.module.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./controllers/v1/auth.controller */ "./src/modules/auth/controllers/v1/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./core/strategies/jwt.strategy */ "./src/modules/auth/core/strategies/jwt.strategy.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn', '7d'),
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule, jwt_1.JwtModule],
    })
], AuthModule);


/***/ },

/***/ "./src/modules/auth/auth.service.ts"
/*!******************************************!*\
  !*** ./src/modules/auth/auth.service.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const prisma_service_1 = __webpack_require__(/*! @common/prisma/prisma.service */ "./src/common/prisma/prisma.service.ts");
const password_util_1 = __webpack_require__(/*! @common/utils/password.util */ "./src/common/utils/password.util.ts");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
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
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.is_active) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const isPasswordValid = await password_util_1.PasswordUtil.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const permissions = user.position.position_permissions.map((pp) => pp.permission.name);
        const payload = {
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
    async register(registerDto) {
        const { email, password, first_name, last_name, position_id } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
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
            throw new common_1.BadRequestException('Invalid position ID');
        }
        const hashedPassword = await password_util_1.PasswordUtil.hash(password);
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
        const permissions = user.position.position_permissions.map((pp) => pp.permission.name);
        const payload = {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);


/***/ },

/***/ "./src/modules/auth/controllers/v1/auth.controller.ts"
/*!************************************************************!*\
  !*** ./src/modules/auth/controllers/v1/auth.controller.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ../../auth.service */ "./src/modules/auth/auth.service.ts");
const login_dto_1 = __webpack_require__(/*! ../../core/dto/login.dto */ "./src/modules/auth/core/dto/login.dto.ts");
const register_dto_1 = __webpack_require__(/*! ../../core/dto/register.dto */ "./src/modules/auth/core/dto/register.dto.ts");
const auth_response_dto_1 = __webpack_require__(/*! ../../core/dto/auth-response.dto */ "./src/modules/auth/core/dto/auth-response.dto.ts");
const public_decorator_1 = __webpack_require__(/*! @common/decorators/public.decorator */ "./src/common/decorators/public.decorator.ts");
const api_response_decorator_1 = __webpack_require__(/*! @common/decorators/api-response.decorator */ "./src/common/decorators/api-response.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const permissions_guard_1 = __webpack_require__(/*! @common/guards/permissions.guard */ "./src/common/guards/permissions.guard.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, res) {
        const authResponse = await this.authService.login(loginDto);
        res.cookie('Authentication', authResponse.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { user: authResponse.user };
    }
    async register(registerDto, res) {
        const authResponse = await this.authService.register(registerDto);
        res.cookie('Authentication', authResponse.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return authResponse;
    }
    async logout(res) {
        res.cookie('Authentication', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0),
        });
        return { message: 'Logout successful' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(auth_response_dto_1.AuthResponseDto),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(auth_response_dto_1.AuthResponseDto),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'User logout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful' }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)({ path: 'auth', version: '1' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./src/modules/auth/core/dto/auth-response.dto.ts"
/*!********************************************************!*\
  !*** ./src/modules/auth/core/dto/auth-response.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AuthResponseDto.prototype, "user", void 0);


/***/ },

/***/ "./src/modules/auth/core/dto/login.dto.ts"
/*!************************************************!*\
  !*** ./src/modules/auth/core/dto/login.dto.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@kulidigital.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ },

/***/ "./src/modules/auth/core/dto/register.dto.ts"
/*!***************************************************!*\
  !*** ./src/modules/auth/core/dto/register.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhagaskoro@kulidigital.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bhagas' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Koro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Position UUID' }),
    (0, class_validator_1.IsUUID)('4', { message: 'Position ID must be a valid UUID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Position ID is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "position_id", void 0);


/***/ },

/***/ "./src/modules/auth/core/strategies/jwt.strategy.ts"
/*!**********************************************************!*\
  !*** ./src/modules/auth/core/strategies/jwt.strategy.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const prisma_service_1 = __webpack_require__(/*! @common/prisma/prisma.service */ "./src/common/prisma/prisma.service.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
        });
        this.configService = configService;
        this.prisma = prisma;
    }
    async validate(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.userId },
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
        if (!user || !user.is_active) {
            throw new common_1.UnauthorizedException('User not found or inactive');
        }
        const permissions = user.position.position_permissions.map((pp) => pp.permission.name);
        return {
            userId: user.id,
            email: user.email,
            positionId: user.position.id,
            positionName: user.position.name,
            permissions,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], JwtStrategy);


/***/ },

/***/ "./src/modules/health/health.controller.ts"
/*!*************************************************!*\
  !*** ./src/modules/health/health.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const public_decorator_1 = __webpack_require__(/*! @common/decorators/public.decorator */ "./src/common/decorators/public.decorator.ts");
let HealthController = class HealthController {
    health() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
        };
    }
    ping() {
        return {
            message: 'pong',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "health", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('ping'),
    (0, swagger_1.ApiOperation)({ summary: 'Ping endpoint' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "ping", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)()
], HealthController);


/***/ },

/***/ "./src/modules/health/health.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/health/health.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const health_controller_1 = __webpack_require__(/*! ./health.controller */ "./src/modules/health/health.controller.ts");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);


/***/ },

/***/ "./src/modules/layers/controllers/v1/layers.controller.ts"
/*!****************************************************************!*\
  !*** ./src/modules/layers/controllers/v1/layers.controller.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const layers_service_1 = __webpack_require__(/*! ../../layers.service */ "./src/modules/layers/layers.service.ts");
const create_layer_dto_1 = __webpack_require__(/*! ../../core/dto/create-layer.dto */ "./src/modules/layers/core/dto/create-layer.dto.ts");
const update_layer_dto_1 = __webpack_require__(/*! ../../core/dto/update-layer.dto */ "./src/modules/layers/core/dto/update-layer.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const permissions_guard_1 = __webpack_require__(/*! @common/guards/permissions.guard */ "./src/common/guards/permissions.guard.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const permissions_constant_1 = __webpack_require__(/*! @common/constants/permissions.constant */ "./src/common/constants/permissions.constant.ts");
const api_response_decorator_1 = __webpack_require__(/*! @common/decorators/api-response.decorator */ "./src/common/decorators/api-response.decorator.ts");
const layer_entity_1 = __webpack_require__(/*! @modules/layers/core/entities/layer.entity */ "./src/modules/layers/core/entities/layer.entity.ts");
const permissions_decorator_1 = __webpack_require__(/*! @common/decorators/permissions.decorator */ "./src/common/decorators/permissions.decorator.ts");
let LayersController = class LayersController {
    constructor(layersService) {
        this.layersService = layersService;
    }
    create(createLayerDto) {
        return this.layersService.create(createLayerDto);
    }
    findAll() {
        return this.layersService.findAll();
    }
    findOne(id) {
        return this.layersService.findOne(id);
    }
    update(id, updateLayerDto) {
        return this.layersService.update(id, updateLayerDto);
    }
    remove(id) {
        return this.layersService.remove(id);
    }
};
exports.LayersController = LayersController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.LAYER.ADD),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(layer_entity_1.LayerEntity),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_layer_dto_1.CreateLayerDto !== "undefined" && create_layer_dto_1.CreateLayerDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], LayersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.LAYER.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get all layers' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(layer_entity_1.LayerEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LayersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.LAYER.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get layer by ID' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(layer_entity_1.LayerEntity),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.LAYER.UPDATE),
    (0, swagger_1.ApiOperation)({ summary: 'Update layer by ID' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(layer_entity_1.LayerEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_layer_dto_1.UpdateLayerDto !== "undefined" && update_layer_dto_1.UpdateLayerDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], LayersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.LAYER.DELETE),
    (0, swagger_1.ApiOperation)({ summary: 'Delete layer by ID' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(layer_entity_1.LayerEntity),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayersController.prototype, "remove", null);
exports.LayersController = LayersController = __decorate([
    (0, swagger_1.ApiTags)('Layers'),
    (0, common_1.Controller)({ path: 'layers', version: '1' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof layers_service_1.LayersService !== "undefined" && layers_service_1.LayersService) === "function" ? _a : Object])
], LayersController);


/***/ },

/***/ "./src/modules/layers/core/dto/create-layer.dto.ts"
/*!*********************************************************!*\
  !*** ./src/modules/layers/core/dto/create-layer.dto.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLayerDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateLayerDto {
}
exports.CreateLayerDto = CreateLayerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the layer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLayerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The code of the layer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLayerDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'GeomType of the layer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLayerDto.prototype, "geomType", void 0);


/***/ },

/***/ "./src/modules/layers/core/dto/update-layer.dto.ts"
/*!*********************************************************!*\
  !*** ./src/modules/layers/core/dto/update-layer.dto.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLayerDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_layer_dto_1 = __webpack_require__(/*! ./create-layer.dto */ "./src/modules/layers/core/dto/create-layer.dto.ts");
class UpdateLayerDto extends (0, swagger_1.PartialType)(create_layer_dto_1.CreateLayerDto) {
}
exports.UpdateLayerDto = UpdateLayerDto;


/***/ },

/***/ "./src/modules/layers/core/entities/layer.entity.ts"
/*!**********************************************************!*\
  !*** ./src/modules/layers/core/entities/layer.entity.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerEntity = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LayerEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.LayerEntity = LayerEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LayerEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LayerEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LayerEntity.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LayerEntity.prototype, "geometryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], LayerEntity.prototype, "feature", void 0);


/***/ },

/***/ "./src/modules/layers/layers.module.ts"
/*!*********************************************!*\
  !*** ./src/modules/layers/layers.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const layers_service_1 = __webpack_require__(/*! ./layers.service */ "./src/modules/layers/layers.service.ts");
const layers_controller_1 = __webpack_require__(/*! ./controllers/v1/layers.controller */ "./src/modules/layers/controllers/v1/layers.controller.ts");
let LayersModule = class LayersModule {
};
exports.LayersModule = LayersModule;
exports.LayersModule = LayersModule = __decorate([
    (0, common_1.Module)({
        controllers: [layers_controller_1.LayersController],
        providers: [layers_service_1.LayersService],
    })
], LayersModule);


/***/ },

/***/ "./src/modules/layers/layers.service.ts"
/*!**********************************************!*\
  !*** ./src/modules/layers/layers.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! @common/prisma/prisma.service */ "./src/common/prisma/prisma.service.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let LayersService = class LayersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLayerDto) {
        const { name, code, geomType } = createLayerDto;
        const existCode = await this.prisma.layer.findUnique({
            where: { code },
        });
        if (existCode) {
            throw new common_1.BadRequestException('Layer code already exists');
        }
        const data = await this.prisma.layer.create({
            data: {
                name,
                code,
                geometryType: geomType,
            },
        });
        return data;
    }
    async findAll() {
        return await this.prisma.layer.findMany({
            where: {
                deleted_at: null,
            }
        });
    }
    async findOne(id) {
        const data = await this.prisma.layer.findUnique({
            where: { id, deleted_at: null },
        });
        return data;
    }
    async update(id, updateLayerDto) {
        const { name, code, geomType } = updateLayerDto;
        const existCode = await this.prisma.layer.findUnique({
            where: { code },
        });
        if (existCode) {
            throw new common_1.BadRequestException('Layer code already exists');
        }
        const data = await this.prisma.layer.update({
            where: { id },
            data: {
                name,
                code,
                geometryType: geomType,
            },
        });
        return data;
    }
    async remove(id) {
        const layer = await this.prisma.layer.findUnique({ where: { id, deleted_at: null } });
        if (!layer) {
            throw new common_1.NotFoundException('Layer not found');
        }
        await this.prisma.layer.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
        await this.prisma.$executeRaw(client_1.Prisma.sql `
        UPDATE "features"
        SET "deleted_at" = NOW(), "updated_at" = NOW()
        WHERE "layer_id" = ${id} AND "deleted_at" IS NULL
      `);
    }
};
exports.LayersService = LayersService;
exports.LayersService = LayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], LayersService);


/***/ },

/***/ "./src/modules/schools/controllers/v1/schools.controller.ts"
/*!******************************************************************!*\
  !*** ./src/modules/schools/controllers/v1/schools.controller.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolsController = void 0;
const permissions_decorator_1 = __webpack_require__(/*! @common/decorators/permissions.decorator */ "./src/common/decorators/permissions.decorator.ts");
const api_response_decorator_1 = __webpack_require__(/*! @common/decorators/api-response.decorator */ "./src/common/decorators/api-response.decorator.ts");
const pagination_dto_1 = __webpack_require__(/*! @common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const permissions_guard_1 = __webpack_require__(/*! @common/guards/permissions.guard */ "./src/common/guards/permissions.guard.ts");
const create_school_dto_1 = __webpack_require__(/*! @modules/schools/core/dto/create-school.dto */ "./src/modules/schools/core/dto/create-school.dto.ts");
const school_query_dto_1 = __webpack_require__(/*! @modules/schools/core/dto/school-query.dto */ "./src/modules/schools/core/dto/school-query.dto.ts");
const update_school_dto_1 = __webpack_require__(/*! @modules/schools/core/dto/update-school.dto */ "./src/modules/schools/core/dto/update-school.dto.ts");
const schools_service_1 = __webpack_require__(/*! @modules/schools/schools.service */ "./src/modules/schools/schools.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const permissions_constant_1 = __webpack_require__(/*! @common/constants/permissions.constant */ "./src/common/constants/permissions.constant.ts");
let SchoolsController = class SchoolsController {
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    create(createSchoolDto) {
        return this.schoolsService.create(createSchoolDto);
    }
    findAll(query) {
        return this.schoolsService.findAll(query);
    }
    findOne(id) {
        return this.schoolsService.findOne(+id);
    }
    update(id, updateSchoolDto) {
        return this.schoolsService.update(+id, updateSchoolDto);
    }
    remove(id) {
        return this.schoolsService.remove(+id);
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_school_dto_1.CreateSchoolDto !== "undefined" && create_school_dto_1.CreateSchoolDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.SCHOOL.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get all schools with pagination and filters' }),
    (0, api_response_decorator_1.ApiSuccessResponse)((pagination_dto_1.PaginatedResponseDto)),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof school_query_dto_1.SchoolQueryDto !== "undefined" && school_query_dto_1.SchoolQueryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SchoolsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_school_dto_1.UpdateSchoolDto !== "undefined" && update_school_dto_1.UpdateSchoolDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolsController.prototype, "remove", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, swagger_1.ApiTags)('Schools'),
    (0, common_1.Controller)({ path: 'schools', version: '1' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof schools_service_1.SchoolsService !== "undefined" && schools_service_1.SchoolsService) === "function" ? _a : Object])
], SchoolsController);


/***/ },

/***/ "./src/modules/schools/core/dto/create-school.dto.ts"
/*!***********************************************************!*\
  !*** ./src/modules/schools/core/dto/create-school.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSchoolDto = void 0;
class CreateSchoolDto {
}
exports.CreateSchoolDto = CreateSchoolDto;


/***/ },

/***/ "./src/modules/schools/core/dto/school-query.dto.ts"
/*!**********************************************************!*\
  !*** ./src/modules/schools/core/dto/school-query.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolQueryDto = void 0;
const pagination_dto_1 = __webpack_require__(/*! @common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SchoolQueryDto extends pagination_dto_1.PaginationDto {
}
exports.SchoolQueryDto = SchoolQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SMAK DAGO' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SchoolQueryDto.prototype, "search", void 0);


/***/ },

/***/ "./src/modules/schools/core/dto/update-school.dto.ts"
/*!***********************************************************!*\
  !*** ./src/modules/schools/core/dto/update-school.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSchoolDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_school_dto_1 = __webpack_require__(/*! ./create-school.dto */ "./src/modules/schools/core/dto/create-school.dto.ts");
class UpdateSchoolDto extends (0, swagger_1.PartialType)(create_school_dto_1.CreateSchoolDto) {
}
exports.UpdateSchoolDto = UpdateSchoolDto;


/***/ },

/***/ "./src/modules/schools/core/entities/school.entity.ts"
/*!************************************************************!*\
  !*** ./src/modules/schools/core/entities/school.entity.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolEntity = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class SchoolEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SchoolEntity = SchoolEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "npsn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "kelurahan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "kecamatan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchoolEntity.prototype, "featureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SchoolEntity.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SchoolEntity.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], SchoolEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object }),
    __metadata("design:type", Object)
], SchoolEntity.prototype, "feature", void 0);


/***/ },

/***/ "./src/modules/schools/core/helpers/school-transform.helper.ts"
/*!*********************************************************************!*\
  !*** ./src/modules/schools/core/helpers/school-transform.helper.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolTransformHelper = void 0;
const school_entity_1 = __webpack_require__(/*! ../entities/school.entity */ "./src/modules/schools/core/entities/school.entity.ts");
class SchoolTransformHelper {
    static toEntity(school) {
        return new school_entity_1.SchoolEntity({
            id: school.id,
            npsn: school.npsn,
            name: school.name,
            level: school.level,
            status: school.status,
            address: school.address,
            kelurahan: school.kelurahan,
            kecamatan: school.kecamatan,
            featureId: school.featureId,
            created_at: school.created_at,
            updated_at: school.updated_at,
            deleted_at: school.deleted_at,
            feature: {
                id: school.feature_id,
                layerId: school.layerId,
                geom: school.geom,
                sourceId: school.sourceId,
                created_at: school.feature_created_at,
                updated_at: school.feature_updated_at,
                deleted_at: school.feature_deleted_at,
            },
        });
    }
    static toEntities(schools) {
        return schools.map((school) => this.toEntity(school));
    }
}
exports.SchoolTransformHelper = SchoolTransformHelper;


/***/ },

/***/ "./src/modules/schools/schools.module.ts"
/*!***********************************************!*\
  !*** ./src/modules/schools/schools.module.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schools_service_1 = __webpack_require__(/*! ./schools.service */ "./src/modules/schools/schools.service.ts");
const schools_controller_1 = __webpack_require__(/*! ./controllers/v1/schools.controller */ "./src/modules/schools/controllers/v1/schools.controller.ts");
let SchoolsModule = class SchoolsModule {
};
exports.SchoolsModule = SchoolsModule;
exports.SchoolsModule = SchoolsModule = __decorate([
    (0, common_1.Module)({
        controllers: [schools_controller_1.SchoolsController],
        providers: [schools_service_1.SchoolsService],
    })
], SchoolsModule);


/***/ },

/***/ "./src/modules/schools/schools.service.ts"
/*!************************************************!*\
  !*** ./src/modules/schools/schools.service.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma_service_1 = __webpack_require__(/*! @common/prisma/prisma.service */ "./src/common/prisma/prisma.service.ts");
const school_transform_helper_1 = __webpack_require__(/*! ./core/helpers/school-transform.helper */ "./src/modules/schools/core/helpers/school-transform.helper.ts");
let SchoolsService = class SchoolsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createSchoolDto) {
        return 'This action adds a new school';
    }
    async findAll(query) {
        const { search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const searchFilter = search
            ? client_1.Prisma.sql `AND s."name" ILIKE ${`%${search}%`}`
            : client_1.Prisma.empty;
        const activeSchoolFilter = client_1.Prisma.sql `
      s."deleted_at" IS NULL
      AND f."deleted_at" IS NULL
      ${searchFilter}
    `;
        const [schools, countRows] = await Promise.all([
            this.prisma.$queryRaw(client_1.Prisma.sql `
        SELECT
          s."id",
          s."npsn",
          s."name",
          s."level",
          s."status",
          s."address",
          s."kelurahan",
          s."kecamatan",
          s."feature_id" AS "featureId",
          s."created_at",
          s."updated_at",
          s."deleted_at",
          f."id" AS "feature_id",
          f."layer_id" AS "layerId",
          ST_AsGeoJSON(f."geom")::json AS "geom",
          f."source_id" AS "sourceId",
          f."created_at" AS "feature_created_at",
          f."updated_at" AS "feature_updated_at",
          f."deleted_at" AS "feature_deleted_at"
        FROM "public"."school" s
        INNER JOIN "public"."feature" f
          ON f."id" = s."feature_id"
        WHERE ${activeSchoolFilter}
        ORDER BY s."created_at" DESC
        LIMIT ${limit}
        OFFSET ${skip}
      `),
            this.prisma.$queryRaw(client_1.Prisma.sql `
        SELECT COUNT(*) AS "total"
        FROM "public"."school" s
        INNER JOIN "public"."feature" f
          ON f."id" = s."feature_id"
        WHERE ${activeSchoolFilter}
      `),
        ]);
        const total = Number(countRows[0].total);
        if (total === 0) {
            throw new common_1.NotFoundException('No schools found');
        }
        return {
            data: school_transform_helper_1.SchoolTransformHelper.toEntities(schools),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    findOne(id) {
        return `This action returns a #${id} school`;
    }
    update(id, updateSchoolDto) {
        return `This action updates a #${id} school`;
    }
    remove(id) {
        return `This action removes a #${id} school`;
    }
};
exports.SchoolsService = SchoolsService;
exports.SchoolsService = SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SchoolsService);


/***/ },

/***/ "./src/modules/users/controllers/v1/users.controller.ts"
/*!**************************************************************!*\
  !*** ./src/modules/users/controllers/v1/users.controller.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ../../users.service */ "./src/modules/users/users.service.ts");
const create_user_dto_1 = __webpack_require__(/*! @modules/users/core/dto/create-user.dto */ "./src/modules/users/core/dto/create-user.dto.ts");
const update_user_dto_1 = __webpack_require__(/*! @modules/users/core/dto/update-user.dto */ "./src/modules/users/core/dto/update-user.dto.ts");
const change_position_dto_1 = __webpack_require__(/*! @modules/users/core/dto/change-position.dto */ "./src/modules/users/core/dto/change-position.dto.ts");
const manage_permissions_dto_1 = __webpack_require__(/*! @modules/users/core/dto/manage-permissions.dto */ "./src/modules/users/core/dto/manage-permissions.dto.ts");
const user_query_dto_1 = __webpack_require__(/*! @modules/users/core/dto/user-query.dto */ "./src/modules/users/core/dto/user-query.dto.ts");
const user_entity_1 = __webpack_require__(/*! ../../core/entities/user.entity */ "./src/modules/users/core/entities/user.entity.ts");
const permissions_decorator_1 = __webpack_require__(/*! @common/decorators/permissions.decorator */ "./src/common/decorators/permissions.decorator.ts");
const permissions_constant_1 = __webpack_require__(/*! @common/constants/permissions.constant */ "./src/common/constants/permissions.constant.ts");
const api_response_decorator_1 = __webpack_require__(/*! @common/decorators/api-response.decorator */ "./src/common/decorators/api-response.decorator.ts");
const pagination_dto_1 = __webpack_require__(/*! @common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
const permissions_guard_1 = __webpack_require__(/*! @common/guards/permissions.guard */ "./src/common/guards/permissions.guard.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @common/guards/jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll(query) {
        return this.usersService.findAll(query);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
    async changePosition(id, changePositionDto) {
        return this.usersService.changePosition(id, changePositionDto);
    }
    async assignPermissions(id, managePermissionsDto) {
        return this.usersService.assignPermissions(id, managePermissionsDto);
    }
    async revokePermissions(id, managePermissionsDto) {
        return this.usersService.revokePermissions(id, managePermissionsDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.ADD),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination and filters' }),
    (0, api_response_decorator_1.ApiSuccessResponse)((pagination_dto_1.PaginatedResponseDto)),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_query_dto_1.UserQueryDto !== "undefined" && user_query_dto_1.UserQueryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.UPDATE),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.DELETE),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/position'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.CHANGE_POSITION),
    (0, swagger_1.ApiOperation)({ summary: 'Change user position/role' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof change_position_dto_1.ChangePositionDto !== "undefined" && change_position_dto_1.ChangePositionDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UsersController.prototype, "changePosition", null);
__decorate([
    (0, common_1.Post)(':id/permissions/assign'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.MANAGE_PERMISSION),
    (0, swagger_1.ApiOperation)({ summary: 'Assign permissions to user position' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof manage_permissions_dto_1.ManagePermissionsDto !== "undefined" && manage_permissions_dto_1.ManagePermissionsDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UsersController.prototype, "assignPermissions", null);
__decorate([
    (0, common_1.Post)(':id/permissions/revoke'),
    (0, permissions_decorator_1.Permissions)(permissions_constant_1.PERMISSIONS.USER.MANAGE_PERMISSION),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke permissions from user position' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, api_response_decorator_1.ApiSuccessResponse)(user_entity_1.UserEntity),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof manage_permissions_dto_1.ManagePermissionsDto !== "undefined" && manage_permissions_dto_1.ManagePermissionsDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], UsersController.prototype, "revokePermissions", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)({ path: 'users', version: '1' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ },

/***/ "./src/modules/users/core/dto/change-position.dto.ts"
/*!***********************************************************!*\
  !*** ./src/modules/users/core/dto/change-position.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePositionDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ChangePositionDto {
}
exports.ChangePositionDto = ChangePositionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'New position UUID',
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'Position ID must be a valid UUID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Position ID is required' }),
    __metadata("design:type", String)
], ChangePositionDto.prototype, "position_id", void 0);


/***/ },

/***/ "./src/modules/users/core/dto/create-user.dto.ts"
/*!*******************************************************!*\
  !*** ./src/modules/users/core/dto/create-user.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
    constructor() {
        this.is_active = true;
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhagaskoro@kulidigital.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bhagas' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Koro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Position UUID' }),
    (0, class_validator_1.IsUUID)('4', { message: 'Position ID must be a valid UUID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Position ID is required' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "position_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_active", void 0);


/***/ },

/***/ "./src/modules/users/core/dto/manage-permissions.dto.ts"
/*!**************************************************************!*\
  !*** ./src/modules/users/core/dto/manage-permissions.dto.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManagePermissionsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ManagePermissionsDto {
}
exports.ManagePermissionsDto = ManagePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['VIEW_USER', 'ADD_USER'],
        description: 'Array of permission names to assign or revoke'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Permissions array cannot be empty' }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ManagePermissionsDto.prototype, "permissions", void 0);


/***/ },

/***/ "./src/modules/users/core/dto/update-user.dto.ts"
/*!*******************************************************!*\
  !*** ./src/modules/users/core/dto/update-user.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'bhagaskoro@kulidigital.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'newpassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bhagas' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Koro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "is_active", void 0);


/***/ },

/***/ "./src/modules/users/core/dto/user-query.dto.ts"
/*!******************************************************!*\
  !*** ./src/modules/users/core/dto/user-query.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserQueryDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const pagination_dto_1 = __webpack_require__(/*! @common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
class UserQueryDto extends pagination_dto_1.PaginationDto {
}
exports.UserQueryDto = UserQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'bhagas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserQueryDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], UserQueryDto.prototype, "position_id", void 0);


/***/ },

/***/ "./src/modules/users/core/entities/user.entity.ts"
/*!********************************************************!*\
  !*** ./src/modules/users/core/entities/user.entity.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class UserEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.UserEntity = UserEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserEntity.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserEntity.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserEntity.prototype, "position_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object)
], UserEntity.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserEntity.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], UserEntity.prototype, "deleted_at", void 0);


/***/ },

/***/ "./src/modules/users/core/helpers/user-transform.helper.ts"
/*!*****************************************************************!*\
  !*** ./src/modules/users/core/helpers/user-transform.helper.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTransformHelper = void 0;
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/modules/users/core/entities/user.entity.ts");
class UserTransformHelper {
    static toEntity(user) {
        const permissions = user.position?.position_permissions?.map((pp) => pp.permission.name) || [];
        return new user_entity_1.UserEntity({
            ...user,
            permissions,
            position: user.position ? {
                id: user.position.id,
                name: user.position.name,
                description: user.position.description,
            } : undefined,
        });
    }
    static toEntities(users) {
        return users.map((user) => this.toEntity(user));
    }
}
exports.UserTransformHelper = UserTransformHelper;


/***/ },

/***/ "./src/modules/users/users.module.ts"
/*!*******************************************!*\
  !*** ./src/modules/users/users.module.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./controllers/v1/users.controller */ "./src/modules/users/controllers/v1/users.controller.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ },

/***/ "./src/modules/users/users.service.ts"
/*!********************************************!*\
  !*** ./src/modules/users/users.service.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! @common/prisma/prisma.service */ "./src/common/prisma/prisma.service.ts");
const password_util_1 = __webpack_require__(/*! @common/utils/password.util */ "./src/common/utils/password.util.ts");
const user_transform_helper_1 = __webpack_require__(/*! ./core/helpers/user-transform.helper */ "./src/modules/users/core/helpers/user-transform.helper.ts");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { email, password, position_id, ...userData } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const position = await this.prisma.position.findUnique({
            where: { id: position_id },
        });
        if (!position) {
            throw new common_1.BadRequestException('Invalid position ID');
        }
        const hashedPassword = await password_util_1.PasswordUtil.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                position_id,
                ...userData,
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
        return user_transform_helper_1.UserTransformHelper.toEntity(user);
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, is_active, position_id } = query;
        const skip = (page - 1) * limit;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.OR = [
                { first_name: { contains: search, mode: 'insensitive' } },
                { last_name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (is_active !== undefined) {
            where.is_active = is_active;
        }
        if (position_id) {
            where.position_id = position_id;
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
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
                orderBy: {
                    created_at: 'desc',
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        if (total === 0) {
            throw new common_1.NotFoundException('No users found');
        }
        return {
            data: user_transform_helper_1.UserTransformHelper.toEntities(users),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, deleted_at: null },
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
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user_transform_helper_1.UserTransformHelper.toEntity(user);
    }
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findFirst({
            where: { id, deleted_at: null },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const { email, password, ...updateData } = updateUserDto;
        if (email && email !== user.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        let hashedPassword;
        if (password) {
            hashedPassword = await password_util_1.PasswordUtil.hash(password);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...updateData,
                ...(email && { email }),
                ...(hashedPassword && { password: hashedPassword }),
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
        return user_transform_helper_1.UserTransformHelper.toEntity(updatedUser);
    }
    async remove(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, deleted_at: null },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.prisma.user.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
    async changePosition(id, changePositionDto) {
        const user = await this.prisma.user.findFirst({
            where: { id, deleted_at: null },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const position = await this.prisma.position.findUnique({
            where: { id: changePositionDto.position_id },
        });
        if (!position) {
            throw new common_1.BadRequestException('Invalid position ID');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { position_id: changePositionDto.position_id },
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
        return user_transform_helper_1.UserTransformHelper.toEntity(updatedUser);
    }
    async assignPermissions(userId, managePermissionsDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deleted_at: null },
            include: { position: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const permissions = await this.prisma.permission.findMany({
            where: { name: { in: managePermissionsDto.permissions } },
        });
        if (permissions.length !== managePermissionsDto.permissions.length) {
            throw new common_1.BadRequestException('One or more permissions are invalid');
        }
        const currentPermissions = await this.prisma.positionPermission.findMany({
            where: { position_id: user.position_id },
        });
        const currentPermissionIds = currentPermissions.map((pp) => pp.permission_id);
        const newPermissionIds = permissions.map((p) => p.id);
        const permissionsToAdd = newPermissionIds.filter((id) => !currentPermissionIds.includes(id));
        if (permissionsToAdd.length > 0) {
            await this.prisma.positionPermission.createMany({
                data: permissionsToAdd.map((permission_id) => ({
                    position_id: user.position_id,
                    permission_id,
                })),
                skipDuplicates: true,
            });
        }
        return this.findOne(userId);
    }
    async revokePermissions(userId, managePermissionsDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deleted_at: null },
            include: { position: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const permissions = await this.prisma.permission.findMany({
            where: { name: { in: managePermissionsDto.permissions } },
        });
        if (permissions.length !== managePermissionsDto.permissions.length) {
            throw new common_1.BadRequestException('One or more permissions are invalid');
        }
        const permissionIds = permissions.map((p) => p.id);
        await this.prisma.positionPermission.deleteMany({
            where: {
                position_id: user.position_id,
                permission_id: { in: permissionIds },
            },
        });
        return this.findOne(userId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], UsersService);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@prisma/adapter-pg"
/*!*************************************!*\
  !*** external "@prisma/adapter-pg" ***!
  \*************************************/
(module) {

module.exports = require("@prisma/adapter-pg");

/***/ },

/***/ "@prisma/client"
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
(module) {

module.exports = require("@prisma/client");

/***/ },

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "cookie-parser"
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
(module) {

module.exports = require("cookie-parser");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

/***/ },

/***/ "joi"
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
(module) {

module.exports = require("joi");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "pg"
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
(module) {

module.exports = require("pg");

/***/ },

/***/ "rxjs/operators"
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
(module) {

module.exports = require("rxjs/operators");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const swaggerEnabled = configService.get('swagger.enabled');
    const corsOrigin = configService.get('app.corsOrigin');
    const swaggerPath = configService.get('swagger.path');
    const apiPrefix = configService.get('app.apiPrefix');
    const port = configService.get('app.port');
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix(apiPrefix);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    if (swaggerEnabled) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('SafeRoute API')
            .setDescription('SafeRoute Backend API Documentation')
            .setVersion('1.0')
            .addTag('Authentication', 'Authentication endpoints')
            .addTag('Users', 'User management endpoints')
            .addTag('Health', 'Health check endpoints')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(swaggerPath, app, document, {
            useGlobalPrefix: true,
            swaggerOptions: {
                persistAuthorization: true,
                defaultModelsExpandDepth: -1,
            },
        });
    }
    await app.listen(port);
    console.log(`\n🚀 Application is running on: http://localhost:${port}/`);
    console.log(`🌍 Environment: ${configService.get('app.env')}\n`);
    if (swaggerEnabled) {
        console.log(`📚 Swagger Documentaion on : http://localhost:${port}/api/${swaggerPath}`);
    }
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🏓 Ping endpoint: http://localhost:${port}/ping\n`);
}
bootstrap();

})();

/******/ })()
;