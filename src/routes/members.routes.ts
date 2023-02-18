import { Router } from "express";
import Member from "../controllers/member.controller";

const router: Router = Router();

router.route("/").get(Member.getMembersPage);
