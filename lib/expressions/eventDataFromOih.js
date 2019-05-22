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
                "extID__c": ""
          };

      return jsonataExpression;
}