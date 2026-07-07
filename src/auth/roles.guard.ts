import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) {
			return true;
		}

		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new UnauthorizedException({ message: 'User is not authorized' });
		}

		const [bearer, token] = authHeader.split(' ');

		if (bearer !== 'Bearer' || !token) {
			throw new UnauthorizedException({ message: 'User is not authorized' });
		}

		let user;
		try {
			user = this.jwtService.verify(token);
		} catch (e) {
			throw new UnauthorizedException({ message: 'User is not authorized' });
		}

		req.user = user;

		const hasRole = user.roles.some((role) => requiredRoles.includes(role.value));

		if (!hasRole) {
			throw new HttpException('No access', HttpStatus.FORBIDDEN);
		}

		return true;
	}
}
