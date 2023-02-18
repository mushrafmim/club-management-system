import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  fullname: string;

  @Column()
  birthDate: Date;

  @Column()
  username: string;

  @Column()
  password: string;
}
