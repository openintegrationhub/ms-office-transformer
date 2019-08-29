const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        "street": JSON.stringify(a.street !== undefined ? a.street : ""),
        "streetNumber": "",
        "unit": "",
        "zipCode": JSON.stringify(a.postalCode !== undefined ? a.postalCode : ""),
        "city": JSON.stringify(a.city !== undefined ? a.city : ""),
        "district": JSON.stringify(a.state !== undefined ? a.state : ""),
        "region": JSON.stringify(a.countryOrRegion !== undefined ? a.countryOrRegion : ""),
        "country": "",
        "countryCode": "",
        "primaryContact": "",
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
    "displayName":  JSON.stringify(msg.body.firstName &' '& msg.body.lastName),
    "gender": "",
    "birthday": JSON.stringify(msg.body.birthday),
    "notes": JSON.stringify(msg.body.personalNotes),
    "language": "",
    "nickname": "",
    "photo": "",
    "anniversary": "",
    "jobTitle": JSON.stringify(msg.body.jobTitle),
    "addresses": mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
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