const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
  const jsonataExpression =
      {
        "oihUid": "",
        "oihCreated": 0,
        "oihLastModified": 0,
        "oihApplicationRecords": [
          {
            "applicationUid": "3",
            "recordUid": msg.body.extID__c
          }
        ],
        "title": msg.body.Title,
        "salutation": msg.body.Salutation,
        "firstName": msg.body.FirstName,
        "lastName": msg.body.LastName,
        "gender": "",
        "birthday": JSON.stringify(msg.body.Birthdate),
        "notes": JSON.stringify(msg.body.Description),
        "language": msg.body.Languages__c,
        "contactData": [
          {
            "value": JSON.stringify(msg.body.Email),
            "type": "email",
            "description": "primary"
          },
          {
            "value": JSON.stringify(msg.body.Phone),
            "type": "phone",
            "description": "primary"
          },
          {
            "value": JSON.stringify(msg.body.Fax),
            "type": "fax",
            "description": "primary"
          },
          {
            "value": JSON.stringify(msg.body.Mobilephone),
            "type": "phone",
            "description": "mobile"
          },
          {
            "value": JSON.stringify(msg.body.Homephone),
            "type": "phone",
            "description": "home"
          },
          {
            "value": JSON.stringify(msg.body.Otherphone),
            "type": "phone",
            "description": "other"
          },
          {
            "value": JSON.stringify(msg.body.Assistantphone),
            "type": "phone",
            "description": "assistant"
          }
        ]
      };

  return jsonataExpression;
}