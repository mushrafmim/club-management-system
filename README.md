# SOCIAL CLUB MANAGEMENT SYSTEM

A web application which helps managing club members, organize events and sending reminders to members and much more.

## Description

Most of the small scale social clubs such as clubs in schools, universities and cities who are working towards members' and societies' wellbeing are currently using social media such as Whatsapp groups, Telegram groups, Facebook pages and so on to communicate with their members. As we can see here, this method is inefficient in some situations since some members may miss some of the contents shared. To overcome this issue we have built a web application which helps clubs to organize their members, plan events and notify about them through email using Courier API.

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
```

4. Setup database settings inside `data-source.ts` file
5. Run `npm start` command
