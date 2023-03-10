# SOCIAL CLUB MANAGEMENT SYSTEM

A web application which helps managing club members, organize events and sending reminders to members and much more.

## Description

Most of the small scale social clubs such as clubs in schools, universities and cities who are working towards members' and societies' wellbeing are currently using social media such as Whatsapp groups, Telegram groups, Facebook pages and so on to communicate with their members. As we can see here, this method is inefficient in some situations since some members may miss some of the contents shared. To overcome this issue we have built a web application which helps clubs to organize their members, plan events and notify about them through email using Courier API.

## Functionalities Implemented

- Members management

The app currently supports inserting, deleting and managing members data.

- Welcome email

Welcome email is sent when the user is added to the club's database.

- Birthday Wishes

Upcoming birthdays are displayed to the club's admin and he can schedule the wish on the particular date to send the wish using Courier Automation.

- Event management

Any events organized by the club can be added to the database and send notifications prior to the event informing the club members using Courier Automation.

## To be implemented

- Event Reminders

Sending reminders about events prior to the event day.

## Technologies Used

- language - Typescript
- backend framework - Express
- templating - Handlebars
- styling - bootstrap
- ORM - TypeORM
- database - MySQL

## For Contribution

1. Clone the Repository

`git clone https://github.com/mushrafmim/club-management-system.git`

2. Install Modules using `npm i`.

3. Create a database named in your MySQL client `clubdb`.

4. Create a `.env` file and populate with the following data.

```
CLUB_DB_URI=mysql://<username>:<password>@localhost:3306/clubdb
COURIER_TOKEN=<courier_token>
PORT=<port_to_run>
WELCOME_MAIL_ID=<Welcome Email Template ID>
BIRTHDAY_MAIL_ID=<Birthday Wish Email Template ID>
EVENT_ANNOUNCEMENT_ID=<Event Announcement email template>
```

4. Run `npm run dev` command
