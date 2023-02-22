import { Router } from "express";
import Member from "../controllers/member.controller";

const router: Router = Router();

router.route("/").get(Member.getMembersPage).post(Member.insertMember);

router.route("/new").get(Member.membersForm);

router.route("/delete/:id").get(Member.deleteMember);

export default router;
