import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  author: string;
}
