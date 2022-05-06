import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
}
