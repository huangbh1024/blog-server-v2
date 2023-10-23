import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number; // 标签 ID 主键
  @Column({ type: 'varchar', length: 255 })
  name: string; // 标签名称
  @Column({ type: 'varchar', length: 255 })
  description: string; // 标签描述
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 创建时间
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 更新时间
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date; // 删除时间

  @ManyToMany(() => Blog, blog => blog.tags)
  @JoinTable()
  blogs: Blog[]; // 博客
}
