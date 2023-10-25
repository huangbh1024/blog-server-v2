import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';
import {
  TagAddDTO,
  TagListDTO,
  TagUpdateDTO,
} from '../controller/tag.controller';
import { Blog } from '../entity/blog.entity';

@Provide()
export class TagService {
  @InjectEntityModel(Tag)
  tagModel: Repository<Tag>;

  @InjectEntityModel(Blog)
  blogModel: Repository<Blog>;

  // 增
  async add(parmas: TagAddDTO) {
    return await this.tagModel.save(parmas);
  }
  // 删
  async del(id: number) {
    return await this.tagModel.softDelete({ id });
  }
  // 改
  async update(id: number, params: TagUpdateDTO) {
    return await this.tagModel.update(id, params);
  }
  // 查
  async list(params: TagListDTO) {
    const { page = 1, size = 10 } = params;
    const [records, total] = await this.tagModel.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    return { records, total };
  }

  async blog(id: number) {
    // return this.blogModel
    //   .createQueryBuilder('blog')
    //   .leftJoinAndSelect('blog.tags', 'tag')
    //   .where('tag.id = :id', { id })
    //   .getMany(); // 这样子blog中的tag只会有一个 不符合要求 难顶

    const tag = await this.tagModel.findOneBy({ id });
    const blogs = await this.blogModel
      .createQueryBuilder('blog')
      .leftJoin('blog.tags', 'tag')
      .where('tag.id = :id', { id })
      .getMany();
    const blogIds = blogs.map(blog => blog.id);
    if (blogIds.length) {
      const [records, total] = await this.blogModel
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.tags', 'tag')
        .where('blog.id in (:...ids)', { ids: blogIds })
        .getManyAndCount();
      return {
        records: records.map(blog => ({
          ...blog,
          tags: blog.tags.map(tag => tag.name),
        })),
        total,
        tagName: tag.name,
      };
    }
    return { records: [], total: 0, tagName: tag.name };
  }
}
