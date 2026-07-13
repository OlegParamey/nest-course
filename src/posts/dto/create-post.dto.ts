import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString({ message: 'Title has to be string' })
	@IsNotEmpty({ message: 'Title is required' })
	readonly title: string;

	@IsString({ message: 'Content has to be string' })
	@IsNotEmpty({ message: 'Content is required' })
	readonly content: string;

	@Type(() => Number)
	@IsNumber({}, { message: 'userId has to be integer' })
	@IsPositive({ message: 'userId must be positive' })
	@IsNotEmpty({ message: 'userId is required' })
	readonly userId: number;
}
