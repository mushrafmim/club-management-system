import { Request, Response } from "express";
import { QueryBuilder, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { scheduleAutomation } from "../services/automation";

const memberRepo: Repository<Member> = AppDataSource.getRepository(Member);
// const memberQuery = memberRepo.createQueryBuilder("member");

export default class EventCtrl {
  public static async getUpcomingBirthdays(req: Request, res: Response) {
    const upcomingBirthdays = await AppDataSource.query(
      "SELECT * FROM upcoming_birthday WHERE days_remaining BETWEEN 1 AND 15"
    );

    res.render("members-birthday", { birthdays: upcomingBirthdays });
    // console.log(upcomingBirthdays);
  }

  public static async scheduleBirthday(req: Request, res: Response) {
    const id = req.params.id;

    const member = await memberRepo.findOne({
      where: { id: Number(id) },
    });

    const delay_time = member.dob + "T00:14:00.000+05:30";

    await scheduleAutomation(delay_time, id, "3SW356REAYM17PPE1KE2974N7BJS", {
      member_name: `${member.firstname} ${member.lastname}`,
    }).then((res) => {
      console.log(res);
    });

    const result = await memberRepo
      .createQueryBuilder()
      .update(Member)
      .set({ birthday_scheduled: true })
      .where("id = :id", { id })
      .execute();

    res.redirect("/events");
  }
}
