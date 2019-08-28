const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
  
  const jsonataExpression =
      {
            "attendees": (jsonata(`$filter(${JSON.stringify(msg.body.data.contacts)}, function($v) {$v.email != ""})`).evaluate()),
            "body": msg.body.data.collaborationElement.content.content,
            "bodyPreview": "",
            "categories": [],
            "changeKey": "",
            "createdDateTime": "",
            "end": {
                        "dateTime": msg.body.data.eventDetails.end,
                        "timeZone": ""
                   },
            "hasAttachments": jsonata(`$count(${JSON.stringify(msg.body.data.collaborationElement.attachments)} > 0 ? true : false`).evaluate(),
            "iCalUId": "",
            "id": msg.body.data.collaborationElement.properties.messageID,
            "importance": "",
            "isAllDay": (jsonata(`$toMillis(${JSON.stringify(msg.body.data.eventDetails.end)}) - $toMillis(${JSON.stringify(msg.body.data.eventDetails.start)}) >= 28800000 ? true : false`).evaluate()),
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
                },
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
          
            "attachments": (jsonata(`$map(${JSON.stringify(msg.body.data.collaborationElement.attachments)}, function($v) {
                  {
                        "contentType": $v.type,
                        "id": "",
                        "isInline": null,
                        "lastModifiedDateTime": "",
                        "name": "",
                        "size": $v.size
                  }
               })`).evaluate()),
            "calendar": {},
            "extensions": [],
            "instances": [],
            "multiValueExtendedProperties": [],
            "singleValueExtendedProperties": []
      }
      
  return jsonataExpression;
}
