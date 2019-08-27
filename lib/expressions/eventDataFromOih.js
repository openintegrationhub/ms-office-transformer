const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  console.log("+++ msg.body:   ", Object.assign({}, msg.body));
  
  const jsonataExpression =
      {
            "attendees": jsonata(`$filter(msg.body.data.contacts, function($v, $i, $a) {$v.email != ""}).value)`).evaluate(),
            "body": msg.body.data.collaborationElement.content.content,
            "bodyPreview": jsonata($substring( msg.body.data.collaborationElement.content.content, 0, 100)),
            "categories": [""],
            "changeKey": "",
            "createdDateTime": "",
            "end": {
                        "dateTime": msg.body.data.eventDetails.end,
                        "timeZone": ""
                   },
            "hasAttachments": jsonata(count$(msg.body.data.collaborationElement.attachments) > 0 ? true : false),
            "iCalUId": "",
            "id": msg.body.data.collaborationElement.properties.messageID,
            "importance": "",
            "isAllDay": jsonata($toMillis(msg.body.data.eventDetails.end) - $toMillis(msg.body.data.eventDetails.start) >= 28800000 ? true : false),
            "isCancelled": null,
            "isOrganizer": null,
            "isReminderOn": null,
            "lastModifiedDateTime": "",
            "location": {
                  "address": {
                                    "city": "",
                                    "countryOrRegion": "",
                                    "postalCode": "",
                                    "state": "",
                                    "street": ""
                              },
                  "coordinates":    {
                                          "accuracy": "",
                                          "altitude": "",
                                          "altitudeAccuracy": "",
                                          "latitude": "",
                                          "longitude": ""
                                    },
                  "displayName": msg.body.data.eventDetails.location,
                  "locationEmailAddress": "",
                  "locationUri": "",
                  "locationType": "",
                  "uniqueId": "",
                  "uniqueIdType": ""
                },,
            "locations": [],
            "onlineMeetingUrl": "",
            "organizer": {},
            "originalEndTimeZone": "",
            "originalStart": "",
            "originalStartTimeZone": "",
            "recurrence": {},
            "reminderMinutesBeforeStart": null,
            "responseRequested": null,
            "responseStatus": {},
            "sensitivity": "",
            "seriesMasterId": "",
            "showAs": "",
            "start": {
                  "dateTime": msg.body.data.eventDetails.start,
                  "timeZone": ""
             },
            "subject": msg.body.data.collaborationElement.header.subject,
            "type": "",
            "webLink": "",
          
            "attachments": jsonata($map(msg.body.data.collaborationElement.attachments, function($v, $i, $a, ) {
                  {
                        "contentType": $v.type,
                        "id": "",
                        "isInline": null,
                        "lastModifiedDateTime": "",
                        "name": "",
                        "size": $v.size
                  }
               })),
            "calendar": { },
            "extensions": [{}],
            "instances": [{}],
            "multiValueExtendedProperties": [{}],
            "singleValueExtendedProperties": [{}]
          }
          

  return jsonataExpression;
}
