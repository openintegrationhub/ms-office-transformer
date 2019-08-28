const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  console.log("+++ MSG BODY: " Object.assign({}, msg.body))
  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        "street": a.street,
        "streetNumber": "",
        "unit": "",
        "zipCode": a.postalCode,
        "city": a.city,
        "district": a.state,
        "region": a.countryOrRegion,
        "countryCode": "",
        "primaryContact": "",
        "label": ""
      })
    });
    return addr
  }

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