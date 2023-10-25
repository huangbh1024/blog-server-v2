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
import { BlogService } from '../service/blog.service';
import { ApiProperty } from '@midwayjs/swagger';

export class BlogAddDTO {
  @ApiProperty({ description: '文章标题', example: '', required: true })
  title: string;
  @ApiProperty({ description: '文章描述', example: '', required: false })
  description?: string;
  @ApiProperty({ description: '文章内容', example: '', required: true })
  content: string;
  @ApiProperty({ description: '文章图片', example: '', required: false })
  image?: string;
  @ApiProperty({ description: '文章标签', example: [], required: false })
  tags?: number[];
  @ApiProperty({ description: '是否发布', example: false, required: false })
  isPublished?: boolean;
}

export class BlogUpdateDTO {
  @ApiProperty({ description: '文章标题', example: '', required: false })
  title?: string;
  @ApiProperty({ description: '文章描述', example: '', required: false })
  description?: string;
  @ApiProperty({ description: '文章内容', example: '', required: false })
  content?: string;
  @ApiProperty({ description: '文章图片', example: '', required: false })
  image?: string;
  @ApiProperty({ description: '文章标签', example: [], required: false })
  tags?: number[];
  @ApiProperty({ description: '是否发布', example: false, required: false })
  isPublished?: boolean;
}

export class BlogListDTO {
  @ApiProperty({ description: '页码', example: 1, required: false })
  page?: number;
  @ApiProperty({ description: '每页数量', example: 5, required: false })
  size?: number;
  @ApiProperty({ description: '排序方式', example: 'ASC', required: false })
  order?: 'ASC' | 'DESC';
  @ApiProperty({
    description: '排序字段',
    example: 'createdAt',
    required: false,
  })
  orderBy?: string;
  @ApiProperty({ description: '搜索关键字', example: '', required: false })
  keyword?: string;
}

@Controller('/blog')
export class BlogController {
  @Inject()
  blogService: BlogService;

  @Post('/', { summary: '新增文章' })
  async add(@Body() body: BlogAddDTO) {
    await this.blogService.add(body);
    return null;
  }

  @Del('/:id', { summary: '删除文章' })
  async del(@Param('id') id: number) {
    await this.blogService.del(id);
    return null;
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: BlogUpdateDTO) {
    await this.blogService.update(id, body);
    return null;
  }

  @Get('/')
  async list(@Query() query: BlogListDTO) {
    return await this.blogService.list(query);
  }

  @Get('/:id')
  async detail(@Param('id') id: number) {
    return await this.blogService.detail(id);
  }

  @Get('/archive')
  async archive() {
    return await this.blogService.archive();
  }
}
