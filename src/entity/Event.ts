import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum EventTypes {
  Personal = "PERSONAL",
  Public = "PUBLIC",
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("datetime")
  date: Date;

  @Column()
  venue: string;

  @Column({
    type: "enum",
    enum: EventTypes,
    default: EventTypes.Public,
  })
  type: EventTypes;

  @Column({
    nullable: true,
  })
  user_id: number;
}
