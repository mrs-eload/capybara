import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
