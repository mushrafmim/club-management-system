import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "./entity/Member";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.CLUB_DB_URI;

console.log(DB_URI);

export const AppDataSource = new DataSource({
  type: "mysql",
  url: DB_URI,
  synchronize: true,
  logging: false,
  entities: [Member],
  migrations: [],
  subscribers: [],
});
