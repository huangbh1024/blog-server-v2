import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';
import {
  TagAddDTO,
  TagListDTO,
  TagUpdateDTO,
} from '../controller/tag.controller';

@Provide()
export class TagService {
  @InjectEntityModel(Tag)
  tagModel: Repository<Tag>;

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
}
