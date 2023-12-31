import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Blog } from '../entity/blog.entity';
import { In, Repository } from 'typeorm';
import {
  BlogAddDTO,
  BlogListDTO,
  BlogUpdateDTO,
} from '../controller/blog.controller';
import { Tag } from '../entity/tag.entity';

@Provide()
export class BlogService {
  @InjectEntityModel(Blog)
  blogModel: Repository<Blog>;

  @InjectEntityModel(Tag)
  tagModel: Repository<Tag>;

  async add(params: BlogAddDTO) {
    const { tags = [], ...others } = params;
    const blog = this.blogModel.create(others);
    const tagEntities = await this.tagModel.findBy({ id: In(tags) });
    blog.tags = tagEntities;
    return await this.blogModel.save(blog);
  }

  async del(id: number) {
    return await this.blogModel.softDelete({ id });
  }

  async update(id: number, params: BlogUpdateDTO) {
    const { tags = [], ...others } = params;
    const blog = await this.blogModel.findOneBy({ id });
    const tagEntities = await this.tagModel.findBy({ id: In(tags) });
    blog.tags = tagEntities;
    return await this.blogModel.save({ ...blog, ...others });
  }

  async list(params: BlogListDTO) {
    const {
      page = 1,
      size = 10,
      order = 'ASC',
      orderBy = 'createdAt',
      keyword = '',
    } = params;
    const [records, total] = await this.blogModel
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.tags', 'tag')
      // title description content 关键字
      .where(
        'blog.title like :keyword or blog.description like :keyword or blog.content like :keyword',
        { keyword: `%${keyword}%` }
      )
      .skip((page - 1) * size)
      .take(size)
      .select(['blog', 'tag'])
      .orderBy(`blog.${orderBy}`, order)
      .getManyAndCount();
    return {
      records: records.map(item => ({
        ...item,
        tags: item.tags.map(tag => tag.name),
      })),
      total,
    };
  }

  async detail(id: number) {
    const blog = await this.blogModel
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.tags', 'tag')
      .select(['blog', 'tag'])
      .addSelect('blog.content')
      .where('blog.id = :id', { id })
      .getOne();
    // 浏览次数 +1
    await this.blogModel.increment({ id }, 'viewCount', 1);
    return {
      ...blog,
      tags: blog.tags.map(tag => tag.name),
    };
  }

  async archive() {
    // 根据年份归档
    const years = await this.blogModel
      .createQueryBuilder('blog')
      .select('YEAR(blog.createdAt)', 'year')
      .groupBy('year')
      .orderBy('year', 'DESC')
      .getRawMany();
    // 根据年份获取博客
    const blogYears = await Promise.all(
      years.map(async ({ year }) => {
        const blogs = await this.blogModel
          .createQueryBuilder('blog')
          .where('YEAR(blog.createdAt) = :year', { year })
          .orderBy('blog.createdAt', 'DESC')
          .getMany();
        return { year, blogs };
      })
    );
    return blogYears;
  }
}
