import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Library extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
