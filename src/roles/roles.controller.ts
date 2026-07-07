import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto);
	}

	@Get('/:value')
	getByValue(@Param('value') vlaue: string) {
		return this.roleService.getRoleByValue(vlaue);
	}
}
