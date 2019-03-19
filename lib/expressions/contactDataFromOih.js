const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
  const jsonataExpression =
      {
        "anniversary": msg.body.anniversary,
        "photo": msg.body.photo,
        "jobTitle": msg.body.jobTitle,
        "nickname": msg.body.nickname,
        "language": msg.body.language,
        "displayName": msg.body.displayName,
        "notes": msg.body.notes,
        "birthday": msg.body.birthday,
        "gender": msg.body.gender,
        "lastName": msg.body.lastName,
        "middleName": msg.body.middleName,
        "firstName": msg.body.firstName,
        "salutation": msg.body.salutation,
        "title": msg.body.title,
        "Level__c": "",
        "Languages__c": msg.body.language,
        "extID__c": msg.body.oihApplicationRecords.recordUid,
        "oihApplicationRecords":
            [
              {
                "applicationUid": msg.body.oihApplicationRecords.applicationUid,
                "recordUid": msg.body.oihApplicationRecords.recordUid,
                "created":
                      {
                        "userId": "",
                        "type": msg.body.oihApplicationRecords.created.type,
                        "timestamp": msg.body.oihApplicationRecords.created.timestamp
                      },
                "lastModified":
                      {
                        "userId": "",
                        "type": msg.body.oihApplicationRecords.lastModified.type,
                        "timestamp": msg.body.oihApplicationRecords.lastModified.timestamp
                      },
                "modificationHistory": msg.body.oihApplicationRecords.modificationHistory,
              }
            ]
      };

  return jsonataExpression;
}