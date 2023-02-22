import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { addToList } from "../services/list_management";
import { sendIndividualMail } from "../services/mail_management";
import { addUser } from "../services/user_management";

const memberRepo: Repository<Member> = AppDataSource.getRepository(Member);

export default class MemberCtrl {
  public static async getMembersPage(req: Request, res: Response) {
    const allMembers = await memberRepo.find();

    return res.render("members-page", { allMembers });
  }

  public static async insertMember(req: Request, res: Response) {
    try {
      const { firstname, lastname, fullname, dob, contact, email } = req.body;

      const member = Object.assign(new Member(), {
        firstname,
        lastname,
        fullname,
        dob,
        contact,
        email,
      });

      const result = await memberRepo.save(member);

      // Adding the user to the courier.
      await addUser(result.id, {
        name: `${firstname} ${lastname}`,
        birthdate: dob,
        phone_number: contact,
        phone_number_verified: true,
        email,
      });

      // Adding the user to the general mailing_list.
      await addToList("GENERAL_NOTIFICATIONS", result.id);

      // Sending the welcoming email
      await sendIndividualMail("4P34S8DRK2MS4VQ9BR80QQ50HW9B", { member_name: lastname }, result.id.toString());

      await res.redirect("/members");
    } catch (error) {
      console.log(error);
      res.redirect("/members");
    }
  }

  public static async membersForm(req: Request, res: Response) {
    try {
      res.render("members-form");
    } catch (error) {
      console.log(error)
    }
  }

  public static async deleteMember(req: Request, res: Response) {
    try {
      const id: string = req.params.id;

      await memberRepo.createQueryBuilder().delete().from(Member).where("id = :id", { id }).execute();

      res.redirect("/members");
    } catch (e) {
      console.log(e);
      res.redirect("/members");
    }
  }
}
