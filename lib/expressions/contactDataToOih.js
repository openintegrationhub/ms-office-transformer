const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        "street": a.street !== undefined ? a.street : $string(""),
        "streetNumber": $string($string("")),
        "unit":  $string(""),
        "zipCode": a.postalCode !== undefined ? a.postalCode : $string(""),
        "city": a.city !== undefined ? a.city : $string(""),
        "district": a.state !== undefined ? a.state : $string(""),
        "region": a.countryOrRegion !== undefined ? a.countryOrRegion : $string(""),
        "country":  $string(""),
        "countryCode":  $string(""),
        "primaryContact":  $string(""),
        "label": $string(""),
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
    "title": msg.body.title === undefined ? $string("") : msg.body.title,  
    "salutation": msg.body.salutation === undefined ? $string("") : msg.body.salutation,
    "firstName": msg.body.firstName === undefined ? $string("") : msg.body.firstName,
    "middleName": msg.body.middleName === undefined ? $string("") : msg.body.middleName,
    "lastName": msg.body.lastName === undefined ? $string("") : msg.body.lastName,
    "displayName":  msg.body.displayName === undefined ? $string("") : msg.body.displayName,
    "gender": $string(""),
    "birthday": msg.body.birthday === undefined ? $string("") : msg.body.birthday,
    "notes": msg.body.personalNotes === undefined ? $string("") : msg.body.personalNotes,
    "language": $string(""),
    "nickname": $string(""),
    "photo": $string(""),
    "anniversary": $string(""),
    "jobTitle": msg.body.jobTitle === undefined ? $string("") : msg.body.jobTitle,
    "addresses": mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
    "contactData": mapContactDataToOIH(msg.body.emailAddresses, msg.body.homePhones, msg.body.imAddresses, msg.body.mobilePhone),
    "calendars": [
      {
        "calendar": $string(""),
        "busyCalendar": $string(""),
        "requestCalendar": $string("")
      }
    ],
    "categories": [
      {
        "name": $string(""),
        "label": $string("")
      }
    ],
  };

  return jsonataExpression;
}