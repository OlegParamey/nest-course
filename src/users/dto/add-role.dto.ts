import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
	@IsString({ message: 'Has to be string' })
	readonly value: string;
	@IsNumber({}, { message: 'Has to be string' })
	readonly userId: number;
}
