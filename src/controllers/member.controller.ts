import { Request, Response } from "express";

export default class MemberCntrl {
  public static getMembersPage(req: Request, res: Response) {
    return res.render("members-page");
  }
}
