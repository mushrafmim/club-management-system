import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { scheduleAutomation } from "../services/automation";

const memberRepo: Repository<Member> = AppDataSource.getRepository(Member);

export default class BirthdayCtrl {
  public static async getUpcomingBirthdays(req: Request, res: Response) {
    const upcomingBirthdays = await AppDataSource.query(
      "SELECT * FROM upcoming_birthdays WHERE days_remaining BETWEEN 0 AND 15"
    );

    res.render("members-birthday", { birthdays: upcomingBirthdays });
  }

  public static async scheduleBirthday(req: Request, res: Response) {
    const id = req.params.id;

    const member = await memberRepo.findOne({
      where: { id: Number(id) },
    });

    let delay_time = member.dob + "T22:46:00.000+05:30";

    delay_time = new Date().getFullYear().toString() + delay_time.slice(4);

    // Scheduling the birthday wish on a particular day.
    const birthdayWishTemplateId = process.env.BIRTHDAY_MAIL_ID;

    await scheduleAutomation(delay_time, id, birthdayWishTemplateId, {
      member_name: `${member.firstname} ${member.lastname}`,
    }).then((res) => {
      console.log("Successfully Scheduled.!");
    });

    // Marking as scheduled.
    const result = await memberRepo
      .createQueryBuilder()
      .update(Member)
      .set({ birthday_scheduled: true })
      .where("id = :id", { id })
      .execute();

    res.redirect("/birthdays");
  }
}
