import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Repository extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  source: string;
}
