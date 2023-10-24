import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@midwayjs/core';
import { ApiProperty } from '@midwayjs/swagger';
import { TagService } from '../service/tag.service';

export class TagAddDTO {
  @ApiProperty({ description: '标签名称', example: '', required: true })
  name: string;
  @ApiProperty({ description: '标签描述', example: '', required: false })
  description?: string;
}

export class TagUpdateDTO {
  @ApiProperty({ description: '标签名称', example: '', required: false })
  name?: string;
  @ApiProperty({ description: '标签描述', example: '', required: false })
  description?: string;
}

export class TagListDTO {
  @ApiProperty({ description: '页码', example: 1, required: false })
  page?: number;
  @ApiProperty({ description: '每页数量', example: 5, required: false })
  size?: number;
}

@Controller('/tag')
export class TagController {
  @Inject()
  tagService: TagService;

  // 增
  @Post('/', { summary: '新增标签' })
  async add(@Body() body: TagAddDTO) {
    await this.tagService.add(body);
    return null;
  }

  // 删
  @Del('/:id', { summary: '删除标签' })
  async del(@Param('id') id: number) {
    await this.tagService.del(id);
    return null;
  }

  // 改
  @Put('/:id', { summary: '修改标签' })
  async update(@Param('id') id: number, @Body() body: TagUpdateDTO) {
    await this.tagService.update(id, body);
    return null;
  }

  // 查
  @Get('/', { summary: '查找标签' })
  async list(@Query() query: TagListDTO) {
    return await this.tagService.list(query);
  }

  // 获取标签下的博客
  @Get('/:id/blog')
  async blog(@Param('id') id: number) {
    return await this.tagService.blog(id);
  }
}
