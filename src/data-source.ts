import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "./entity/Member";
import * as dotenv from "dotenv";
import { Event } from "./entity/Event";
import { UpcomingBirthdays } from "./entity/UpcomingEventsView";

dotenv.config();

const DB_URI = process.env.CLUB_DB_URI;

export const AppDataSource = new DataSource({
  type: "mysql",
  url: DB_URI,
  synchronize: true,
  logging: false,
  entities: [Member, Event, UpcomingBirthdays],
  migrations: [],
  subscribers: [],
});
