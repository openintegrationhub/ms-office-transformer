const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        "street": a.street !== undefined ? a.street : jsonata($string("")),
        "streetNumber": jsonata($string("")),
        "unit":  jsonata($string("")),
        "zipCode": a.postalCode !== undefined ? a.postalCode : jsonata($string("")),
        "city": a.city !== undefined ? a.city : jsonata($string("")),
        "district": a.state !== undefined ? a.state : jsonata($string("")),
        "region": a.countryOrRegion !== undefined ? a.countryOrRegion : jsonata($string("")),
        "country":  jsonata($string("")),
        "countryCode":  jsonata($string("")),
        "primaryContact":  jsonata($string("")),
        "label": jsonata($string("")),
      })
    });
    return addr;
  }

  function mapContactDataToOIH(emailAddresses, homePhones, imAddresses, mobilePhone) {
    let cd = [];

    // map email addresses
    cd.concat(emailAddresses.map(email => {
      return {
                "value": email.address,
                "type": "email",
                "label": email.name,
                "description": "email address"
              }
    }));

    // map private phone numbers
    cd.concat(homePhones.map(hp => {
      return {
                "value": hp,
                "type": "phone",
                "label": "home",
                "description": "private phone number"
              }
    }));

    // map instant messaging accounts
    cd.concat(imAddresses.map(ia => {
      return {
                "value": ia,
                "type": "imAddress",
                "label": "instant messaging",
                "description": "instant messaging address"
              }
    }));

    // map single mobile phone
    cd.push(
      {
        "value": mobilePhone,
        "type": "phone",
        "label": "mobilePhone",
        "description": "cell phone number"
      }
    );

    return cd;
  }

  const jsonataExpression =
  {
    "title": msg.body.title === undefined ? jsonata($string("")) : msg.body.title,  
    "salutation": msg.body.salutation === undefined ? jsonata($string("")) : msg.body.salutation,
    "firstName": msg.body.firstName === undefined ? jsonata($string("")) : msg.body.firstName,
    "middleName": msg.body.middleName === undefined ? jsonata($string("")) : msg.body.middleName,
    "lastName": msg.body.lastName === undefined ? jsonata($string("")) : msg.body.lastName,
    "displayName":  msg.body.displayName === undefined ? jsonata($string("")) : msg.body.displayName,
    "gender": jsonata($string("")),
    "birthday": msg.body.birthday === undefined ? jsonata($string("")) : msg.body.birthday,
    "notes": msg.body.personalNotes === undefined ? jsonata($string("")) : msg.body.personalNotes,
    "language": jsonata($string("")),
    "nickname": jsonata($string("")),
    "photo": jsonata($string("")),
    "anniversary": jsonata($string("")),
    "jobTitle": msg.body.jobTitle === undefined ? jsonata($string("")) : msg.body.jobTitle,
    "addresses": mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
    "contactData": mapContactDataToOIH(msg.body.emailAddresses, msg.body.homePhones, msg.body.imAddresses, msg.body.mobilePhone),
    "calendars": [
      {
        "calendar": jsonata($string("")),
        "busyCalendar": jsonata($string("")),
        "requestCalendar": jsonata($string(""))
      }
    ],
    "categories": [
      {
        "name": jsonata($string("")),
        "label": jsonata($string(""))
      }
    ],
  };

  return jsonataExpression;
}