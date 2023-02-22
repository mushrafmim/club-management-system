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

    let delay_time = member.dob + "T00:14:00.000+05:30";

    delay_time = new Date().getFullYear().toString() + delay_time.slice(4);

    // Scheduling the birthday wish on a particular day.
    const birthdayWishTemplateId = process.env.BIRTHDAY_MAIL_ID;

    await scheduleAutomation(delay_time, id, birthdayWishTemplateId, {
      member_name: `${member.firstname} ${member.lastname}`,
    }).then((res) => {
      console.log(res);
    });

    // Marking as scheduled.
    const result = await memberRepo
      .createQueryBuilder()
      .update(Member)
      .set({ birthday_scheduled: true })
      .where("id = :id", { id })
      .execute();

    res.redirect("/events");
  }
}
