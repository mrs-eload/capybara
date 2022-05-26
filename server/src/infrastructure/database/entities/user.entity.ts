import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  static getByEmail(user: any): Promise<User> {
    return User.findOne({
      where: [{ email: user.email }],
    });
  }

  static getById(id: number) {
    return User.findOne(id);
  }
}
