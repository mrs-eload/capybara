import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Team extends BaseEntity {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string
}