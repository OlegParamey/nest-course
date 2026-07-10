import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.com', description: 'Mail address' })
	@IsString({ message: 'Must be a string' })
	@IsEmail({}, { message: 'Wrong email' })
	readonly email: string;

	@ApiProperty({ example: 'pas213', description: 'Password' })
	@IsString({ message: 'Must be a string' })
	@Length(4, 16, { message: 'Pasword length has to be from 4 to 16 chars' })
	readonly password: string;
}
