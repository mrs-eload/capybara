import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Repository extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;
}
