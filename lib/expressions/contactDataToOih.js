const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        "street": JSON.stringify(a.street !== undefined ? a.street : ""),
        "streetNumber":  JSON.stringify(""),
        "unit":  JSON.stringify(""),
        "zipCode": JSON.stringify(a.postalCode !== undefined ? a.postalCode : ""),
        "city": JSON.stringify(a.city !== undefined ? a.city : ""),
        "district": JSON.stringify(a.state !== undefined ? a.state : ""),
        "region": JSON.stringify(a.countryOrRegion !== undefined ? a.countryOrRegion : ""),
        "country":  JSON.stringify(""),
        "countryCode":  JSON.stringify(""),
        "primaryContact":  JSON.stringify(""),
        "label": JSON.stringify(""),
      })
    });
    return addr
  }

  const jsonataExpression =
  {
    "title": JSON.stringify(msg.body.title),  
    "salutation": JSON.stringify(msg.body.salutation),
    "firstName": JSON.stringify(msg.body.firstName),
    "middleName": JSON.stringify(msg.body.middleName),
    "lastName": JSON.stringify(msg.body.lastName),
    "displayName":  msg.body.firstName &' '& msg.body.lastName,
    "gender": '',
    "birthday": JSON.stringify(msg.body.birthday),
    "notes": JSON.stringify(msg.body.personalNotes),
    "language": JSON.stringify(""),
    "nickname": JSON.stringify(""),
    "photo": JSON.stringify(""),
    "anniversary": JSON.stringify(""),
    "jobTitle": JSON.stringify(msg.body.jobTitle),
    "addresses": mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
    "contactData": [
      {
        "value": JSON.stringify(""),
        "type": JSON.stringify(""),
        "label": JSON.stringify(""),
        "description": JSON.stringify("")
      }
    ],
    "calendars": [
      {
        "calendar": JSON.stringify(""),
        "busyCalendar": JSON.stringify(""),
        "requestCalendar": JSON.stringify("")
      }
    ],
    "categories": [
      {
        "name": JSON.stringify(""),
        "label": JSON.stringify("")
      }
    ],
  };

  return jsonataExpression;
}