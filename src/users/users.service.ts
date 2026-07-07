import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService,
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('USER');
		user.roles = [role!];
		await user.$set('roles', [role!.Id]);
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email: email },
			include: { all: true },
		});

		return user;
	}

	async deleteUserById(id: number) {
		const user = await this.userRepository.destroy({ where: { Id: id } });
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);
		if (user && role) {
			await user.$add('role', role.Id);
			return dto;
		}
		throw new HttpException('User or role is not found', HttpStatus.NOT_FOUND);
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByValue('JAIL');
		if (!user) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
		}
		if (!role) {
			throw new HttpException('Role is not found', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReasoon = dto.banReason;

		user.$set('roles', [role.Id]);

		await user.save();
		return user;
	}

	async unban(id: number) {
		const user = await this.userRepository.findByPk(id);
		const role = await this.roleService.getRoleByValue('USER');
		if (!user) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
		}
		if (!role) {
			throw new HttpException('Role is not found', HttpStatus.NOT_FOUND);
		}
		user.banned = false;
		user.banReasoon = null;

		user.$set('roles', [role.Id]);

		await user.save();
		return user;
	}
}
