const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        street: a.street !== undefined ? a.street : "",
        streetNumber:  "",
        unit:  "",
        zipCode: a.postalCode !== undefined ? a.postalCode : "",
        city: a.city !== undefined ? a.city : "",
        district: a.state !== undefined ? a.state : "",
        region: a.countryOrRegion !== undefined ? a.countryOrRegion : "",
        country:  "",
        countryCode:  "",
        primaryContact:  "",
        label: "",
      })
    });
    return addr;
  }

  function mapContactDataToOIH(emailAddresses, homePhones, imAddresses, mobilePhone) {
    let cd = [];

    // map email addresses
    cd.concat(emailAddresses.map(email => {
      return {
                "value": email.address === undefined ? "" : email.address,
                "type": "email",
                "label": email.name === undefined ? "" : email.name,
                "description": "email address"
              }
    }));

    // map private phone numbers
    cd.concat(homePhones.map(hp => {
      return {
                value: hp === undefined ? "" : hp,
                type: "phone",
                label: "home",
                description: "private phone number"
              }
    }));

    // map instant messaging accounts
    cd.concat(imAddresses.map(ia => {
      return {
                value: ia === undefined ? "" : ia,
                type: "imAddress",
                label: "instant messaging",
                description: "instant messaging address"
              }
    }));

    // map single mobile phone
    cd.push(
      {
        value: mobilePhone === undefined ? "" : mobilePhone,
        type: "phone",
        label: "mobilePhone",
        description: "cell phone number"
      }
    );

    return cd;
  }

  const jsonataExpression =
  {
    title: msg.body.title === undefined ? "" : msg.body.title,  
    salutation: msg.body.salutation === undefined ? "" : msg.body.salutation,
    firstName: msg.body.firstName === undefined ? "" : msg.body.firstName,
    middleName: msg.body.middleName === undefined ? "" : msg.body.middleName,
    lastName: msg.body.lastName === undefined ? "" : msg.body.lastName,
    displayName:  msg.body.displayName === undefined ? "" : msg.body.displayName,
    gender: "",
    birthday: msg.body.birthday === undefined ? "" : msg.body.birthday,
    notes: msg.body.personalNotes === undefined ? "" : msg.body.personalNotes,
    language: "",
    nickname: "",
    photo: "",
    anniversary: "",
    jobTitle: msg.body.jobTitle === undefined ? "" : msg.body.jobTitle,
    addresses: mapMicrosoftAddressDataToOIH([msg.body.homeAddress, msg.body.businessAddress, msg.body.otherAddress]),
    contactData: mapContactDataToOIH(msg.body.emailAddresses, msg.body.homePhones, msg.body.imAddresses, msg.body.mobilePhone),
    calendars: [
      {
        calendar: "",
        busyCalendar: "",
        requestCalendar: ""
      }
    ],
    categories: [
      {
        name: "",
        label: ""
      }
    ],
  };

  return jsonataExpression;
}