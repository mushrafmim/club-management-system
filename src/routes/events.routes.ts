import { Router } from "express";
import EventCtrl from "../controllers/event.controller";

const router: Router = Router();

router.route("/").get(EventCtrl.getEventsPage).post(EventCtrl.insertEvent);

router.route("/new").get(EventCtrl.eventsForm);

router.route("/schedule/:id").get(EventCtrl.scheduleEvent);

export default router;
