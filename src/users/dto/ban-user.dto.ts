import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class BanUserDto {
	@Type(() => Number)
	@IsNumber({}, { message: 'userId has to be a number' })
	@Min(1, { message: 'userId must be a positive number' })
	readonly userId: number;

	@IsString({ message: 'banReason has to be a string' })
	@IsNotEmpty({ message: 'banReason is required' })
	readonly banReason: string;
}
