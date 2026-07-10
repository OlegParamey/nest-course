import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Create User' })
	@ApiResponse({ status: 200, type: User })
	// @UsePipes(ValidationPipe)
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	// @Roles('ADMIN', 'USER')
	// @UseGuards(RolesGuard)
	@UseGuards(JwtAuthGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Delete user by id' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete('/:id')
	delete(@Param('id') id: number) {
		return this.usersService.deleteUserById(id);
	}

	@ApiOperation({ summary: 'Assign the role to the user' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({ summary: 'Ban the user' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}

	@ApiOperation({ summary: 'Unban the user' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Patch('/unban/:id')
	unban(@Param('id') id: number) {
		return this.usersService.unban(id);
	}
}
