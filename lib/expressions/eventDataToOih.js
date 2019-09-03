const jsonata = require('jsonata');
const jsonataMoment = require('@elastic.io/jsonata-moment');

module.exports.getExpression = function(msg)
{
  const jsonataExpression =
  {
    collaborationElement: {
      header: {
        from: "",
        to: msg.body.attendees !== undefined && msg.body.attendees.length > 0 ? jsonata(`$map(msg.body.attendees, function($v) {
          $v.emailAddress.address
        })`).evaluate() : [],
        cc: [],
        bcc: [],
        subject: msg.body.subject === undefined || msg.body.subject === null ? "" : msg.body.subject
      },
      date: {
        date: msg.body.createdDateTime === undefined || msg.body.createdDateTime === null ? "" : msg.body.createdDateTime,
        day: msg.body.createdDateTime === undefined || msg.body.createdDateTime === null ? "" : jsonataMoment('$moment(msg.body.createdDateTime).format("dddd")').evaluate(),
        time: msg.body.createdDateTime === undefined || msg.body.createdDateTime === null ? "" : jsonataMoment('$moment(msg.body.createdDateTime).format("HH:mm")').evaluate()
      },
      properties: {
        messageID: msg.body.id === undefined || msg.body.id === null ? "" : msg.body.id,
        language: "",
        authentication: "",
        mimeVersion: 0
      },
      content: {
        format: msg.body.body.contentType === undefined || msg.body.body.contentType === null ? "" : msg.body.body.contentType,
        content: msg.body.body.content === undefined || msg.body.body.content === null ? "" : msg.body.body.content
      },
      attachments: msg.body.attachments !== undefined && msg.body.attachments.length > 0 ? jsonata(`$map(msg.body.attachments, function($v) {
        {
          type: $v.contentType,
          size: $string($v.size)
        }
      })`).evaluate() : []
    },
    contacts: msg.body.attendees !== undefined && msg.body.attendees.length > 0 ? jsonata(`$map(msg.body.attendees, function($v) {
      {
        name: "",
        email: $v.emailAddress.address,
        calendars: [
          {
            calendars: "",
            requestCalendar: "",
            status: ""
          }
        ]
      }
      })`).evaluate() : [],
    location: msg.body.location.displayName === undefined || msg.body.location.displayName === null ? "" : msg.body.location.displayName,
    start: msg.body.start.dateTime === undefined || msg.body.start.dateTime === null ? "" : msg.body.start.dateTime,
    end: msg.body.end.dateTime === undefined || msg.body.end.dateTime === null ? "" : msg.body.end.dateTime,
  };

  return jsonataExpression;
}