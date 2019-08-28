const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  const jsonataExpression =
  {
    "title": msg.body.title,
    "salutation": msg.body.salutation,
    "firstName": msg.body.firstName,
    "middleName": msg.body.middleName,
    "lastName": msg.body.lastName,
    "displayName":  msg.body.firstName &' '& msg.body.lastName,
    "gender": "",
    "birthday": JSON.stringify(msg.body.birthday),
    "notes": JSON.stringify(msg.body.personalNotes),
    "language": "",
    "nickname": "",
    "photo": "",
    "anniversary": "",
    "jobTitle": msg.body.jobTitle,
    "addresses": [],
    "contactData": [
      {
        "value": "",
        "type": "",
        "label": "",
        "description": ""
      }
    ],
    "calendars": [
      {
        "calendar": "",
        "busyCalendar": "",
        "requestCalendar": ""
      }
    ],
    "categories": [
      {
        "name": "",
        "label": ""
      }
    ],
  };

  return jsonataExpression;
}