import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post) private postRepository: typeof Post,
		private filesService: FilesService,
	) {}

	async create(dto: CreatePostDto, image: any) {
		const fileName = await this.filesService.createFile(image);
		try {
			const post = await this.postRepository.create({ ...dto, image: fileName });
			return post;
		} catch (e) {
			console.log('NAME:', e.name);
			console.log('ERRORS:', e.errors);
			console.log('ORIGINAL:', e.original);
			throw e;
		}
	}
}
