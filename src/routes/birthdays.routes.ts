import { Router } from "express";
import BirthdayCtrl from "../controllers/birthday.controller";

const router: Router = Router();

router.route("/").get(BirthdayCtrl.getUpcomingBirthdays);

router.route("/schedule/:id").get(BirthdayCtrl.scheduleBirthday);

export default router;
