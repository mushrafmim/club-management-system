import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Event } from "../entity/Event";
import { Member } from "../entity/Member";
import { scheduleAutomation } from "../services/automation";
import { sendBroadcastMail } from "../services/mail_management";

const eventRepo: Repository<Event> = AppDataSource.getRepository(Event);

export default class EventCtrl {
  public static async getEventsPage(req: Request, res: Response) {
    const allEvents = await eventRepo.find();

    return res.render("events-page", { allEvents });
  }

  public static async eventsForm(req: Request, res: Response) {
    try {
      res.render("events-form");
    } catch (error) {
      console.log(error);
    }
  }

  public static async insertEvent(req: Request, res: Response) {
    try {
      const { title, date, venue } = req.body;

      const event = Object.assign(new Event(), {
        title,
        date,
        venue,
        type: "PUBLIC",
      });

      const event_template = process.env.EVENT_ANNOUNCEMENT_ID;

      console.log(event_template);
      await sendBroadcastMail(
        event_template,
        {
          event_name: title,
          EventVenue: venue,
          EventDate: date,
        },
        "ALL_MEMBERS"
      );

      const result = await eventRepo.save(event);

      res.redirect("/events");
    } catch (e) {
      console.log(e);
    }
  }

  // To be implemented.
  public static async scheduleEvent(req: Request, res: Response) {
    try {
      const id: string = req.params.id;

      const event = await eventRepo.findOne({
        where: {
          id: Number(id),
        },
      });

      // Going to send reminder email before 3 days.
      event.date.setDate(event.date.getDate() - 3);

      res.redirect("/events");
    } catch (error) {
      console.log(error);
      res.redirect("/events");
    }
  }
}
