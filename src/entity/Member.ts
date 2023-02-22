import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsPhoneNumber } from "class-validator";

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

  @Column("date")
  dob: Date;

  @Column({
    type: "boolean",
    default: false,
  })
  birthday_scheduled: boolean;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsPhoneNumber()
  contact: string;
}
