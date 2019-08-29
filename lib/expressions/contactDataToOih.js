const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        street: JSON.stringify(a.street !== undefined ? a.street : ""),
        streetNumber:  JSON.stringify(""),
        unit:  JSON.stringify(""),
        zipCode: JSON.stringify(a.postalCode !== undefined ? a.postalCode : ""),
        city: JSON.stringify(a.city !== undefined ? a.city : ""),
        district: JSON.stringify(a.state !== undefined ? a.state : ""),
        region: JSON.stringify(a.countryOrRegion !== undefined ? a.countryOrRegion : ""),
        country:  JSON.stringify(""),
        countryCode:  JSON.stringify(""),
        primaryContact:  JSON.stringify(""),
        label: JSON.stringify(""),
      })
    });
    return addr;
  }

  function mapContactDataToOIH(emailAddresses, homePhones, imAddresses, mobilePhone) {
    let cd = [];

    // map email addresses
    cd.concat(emailAddresses.map(email => {
      return {
                "value": JSON.stringify(email.address),
                "type": JSON.stringify("email"),
                "label": JSON.stringify(email.name),
                "description": JSON.stringify("email address")
              }
    }));

    // map private phone numbers
    cd.concat(homePhones.map(hp => {
      return {
                value: JSON.stringify(hp),
                type: JSON.stringify("phone"),
                label: JSON.stringify("home"),
                description: JSON.stringify("private phone number")
              }
    }));

    // map instant messaging accounts
    cd.concat(imAddresses.map(ia => {
      return {
                value: JSON.stringify(ia),
                type: JSON.stringify("imAddress"),
                label: JSON.stringify("instant messaging"),
                description: JSON.stringify("instant messaging address")
              }
    }));

    // map single mobile phone
    cd.push(
      {
        value: JSON.stringify(mobilePhone),
        type: JSON.stringify("phone"),
        label: JSON.stringify("mobilePhone"),
        description: JSON.stringify("cell phone number")
      }
    );

    return cd;
  }

  const jsonataExpression =
  {
    title: JSON.stringify(msg.body.title),  
    salutation: JSON.stringify(msg.body.salutation),
    firstName: JSON.stringify(msg.body.firstName),
    middleName: JSON.stringify(msg.body.middleName),
    lastName: JSON.stringify(msg.body.lastName),
    displayName:  JSON.stringify(msg.body.displayName),
    gender: JSON.stringify(""),
    birthday: JSON.stringify(msg.body.birthday),
    notes: JSON.stringify(msg.body.personalNotes),
    language: JSON.stringify(""),
    nickname: JSON.stringify(""),
    photo: JSON.stringify(""),
    anniversary: JSON.stringify(""),
    jobTitle: JSON.stringify(msg.body.jobTitle),
    addresses: mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
    contactData: mapContactDataToOIH(msg.body.emailAddresses, msg.body.homePhones, msg.body.imAddresses, msg.body.mobilePhone),
    calendars: [
      {
        calendar: JSON.stringify(""),
        busyCalendar: JSON.stringify(""),
        requestCalendar: JSON.stringify("")
      }
    ],
    categories: [
      {
        name: JSON.stringify(""),
        label: JSON.stringify("")
      }
    ],
  };

  return jsonataExpression;
}