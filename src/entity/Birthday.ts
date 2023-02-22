import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Birthday {
  @PrimaryGeneratedColumn()
  id: number;


  user_id: number;
}
