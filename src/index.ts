import { AppDataSource } from "./data-source";
import * as express from "express";
import { engine } from "express-handlebars";
import memberRouter from "./routes/members.routes";
import eventsRouter from "./routes/events.routes";
import birthdaysRouter from "./routes/birthdays.routes";
import path = require("path");
import bodyParser = require("body-parser");

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    const port: number = Number(process.env.PORT) || 5000;

    app.engine(
      "handlebars",
      engine({
        defaultLayout: "main",
      })
    );

    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "/views"));

    app.use(express.static(__dirname + "/views/assets"));
    // Routes
    app.get("/", (req: express.Request, res: express.Response) => {
      res.render("home");
    });

    app.use("/birthdays", birthdaysRouter);
    app.use("/members", memberRouter);
    app.use("/events", eventsRouter);

    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });

    app.listen(3000, "192.168.1.19", () => {
      console.log(`listening on port: ${3000}`);
    });
  })

  .catch((error) => console.log(error));
