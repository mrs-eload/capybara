import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  link: string;

  @Column()
  pinned: boolean;
}
