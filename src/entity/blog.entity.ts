import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number; // 博客 ID 主键
  @Column({ type: 'varchar', length: 255 })
  title: string; // 博客标题
  @Column({ type: 'varchar', length: 255 })
  description: string; // 博客描述
  @Column({ type: 'text', select: false })
  content: string; // 博客内容
  @Column({ type: 'varchar', length: 255 })
  image: string; // 博客图片
  @Column({ type: 'boolean', default: false })
  isPublished: boolean; // 是否发布
  @Column({ type: 'int', default: 0 })
  viewCount: number; // 浏览次数
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 创建时间
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 更新时间
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date; // 删除时间

  @ManyToMany(() => Tag, tag => tag.blogs)
  tags: Tag[];
}
