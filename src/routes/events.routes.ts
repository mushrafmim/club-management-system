import { Router } from "express";
import EventCtrl from "../controllers/event.controller";

const router: Router = Router();

router.route("/").get(EventCtrl.getUpcomingBirthdays);

router.route("/birthday/:id").get(EventCtrl.scheduleBirthday);

export default router;
