import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.com', description: 'Mail address' })
	readonly email: string;
	@ApiProperty({ example: 'pas213', description: 'Password' })
	readonly password: string;
}
