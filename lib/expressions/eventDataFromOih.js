const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
      const jsonataExpression =
          {
                "eventDetails":
                [
                      {
                            "start": msg.body.eventDetails.start,
                            "end": msg.body.eventDetails.end,
                            "location": msg.body.eventDetails.location
                      }
                ],
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