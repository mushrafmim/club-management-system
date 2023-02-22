import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
    SELECT
        id,
        CONCAT(firstname, ' ', lastname) name,
        birthday_scheduled,
        DATE_FORMAT(CONCAT(YEAR(CURDATE()), '-', DATE_FORMAT(dob, '%m-%d')), '%Y-%m-%d') AS birthday_on,
        DATEDIFF(DATE_FORMAT(CONCAT(YEAR(CURDATE()), '-', DATE_FORMAT(dob, '%m-%d')), '%Y-%m-%d'), CURDATE()) AS days_remaining
    from member;
    `,
})
export class UpcomingBirthdays {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  birthday_on: string;

  @ViewColumn()
  days_remaining: number;
}
