import { AppDataSource } from "./data-source";
import * as express from "express";
import { engine } from "express-handlebars";
import router from "./routes/members.routes";
import path = require("path");

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    const port = process.env.PORT || 5000;

    app.engine(
      "handlebars",
      engine({
        defaultLayout: "main",
      })
    );

    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "/views"));

    app.use(router);

    app.listen(port, () => {
      console.log(`listening on port: ${port}`);
    });
  })

  .catch((error) => console.log(error));
