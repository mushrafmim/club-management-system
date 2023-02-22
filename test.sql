CREATE VIEW upcoming_birthday
AS SELECT 
id,
CONCAT(firstname, ' ', lastname) name,
birthday_scheduled,
DATE_FORMAT(CONCAT(YEAR(CURDATE()), '-', DATE_FORMAT(dob, '%m-%d')), '%Y-%m-%d') AS birthday_on,
DATEDIFF(DATE_FORMAT(CONCAT(YEAR(CURDATE()), '-', DATE_FORMAT(dob, '%m-%d')), '%Y-%m-%d'), CURDATE()) AS days_remaining
from member;