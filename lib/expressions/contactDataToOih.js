const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        street: a.street !== undefined || a.street === null  ? a.street : "",
        streetNumber:  "",
        unit:  "",
        zipCode: a.postalCode !== undefined || a.po === null  ? a.postalCode : "",
        city: a.city !== undefined || a.city === null  ? a.city : "",
        district: a.state !== undefined || a.state === null  ? a.state : "",
        region: a.countryOrRegion !== undefined || a.countryOrRegion === null  ? a.countryOrRegion : "",
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
                "value": email.address === undefined || email.address === null  ? "" : email.address,
                "type": "email",
                "label": email.name === undefined || email.name === null  ? "" : email.name,
                "description": "email address"
              }
    }));

    // map private phone numbers
    cd.concat(homePhones.map(hp => {
      return {
                value: hp === undefined || hp === null  ? "" : hp,
                type: "phone",
                label: "home",
                description: "private phone number"
              }
    }));

    // map instant messaging accounts
    cd.concat(imAddresses.map(ia => {
      return {
                value: ia === undefined || ia === null  ? "" : ia,
                type: "imAddress",
                label: "instant messaging",
                description: "instant messaging address"
              }
    }));

    // map single mobile phone
    cd.push(
      {
        value: mobilePhone === undefined || mobilePhone === null  ? "" : mobilePhone,
        type: "phone",
        label: "mobilePhone",
        description: "cell phone number"
      }
    );

    return cd;
  }

  const jsonataExpression =
  {
    title: msg.body.title === undefined || msg.body.title === null  || msg.body.title === null  ? "" : msg.body.title,  
    salutation: msg.body.salutation === undefined || msg.body.salutation === null  ? "" : msg.body.salutation,
    firstName: msg.body.firstName === undefined || msg.body.firstName === null  ? "" : msg.body.firstName,
    middleName: msg.body.middleName === undefined || msg.body.middleName === null  ? "" : msg.body.middleName,
    lastName: msg.body.lastName === undefined || msg.body.lastName === null  ? "" : msg.body.lastName,
    displayName:  msg.body.displayName === undefined || msg.body.displayName === null  ? "" : msg.body.displayName,
    gender: "",
    birthday: msg.body.birthday === undefined || msg.body.birthday === null  ? "" : msg.body.birthday,
    notes: msg.body.personalNotes === undefined || msg.body.personalNotes === null  ? "" : msg.body.personalNotes,
    language: "",
    nickname: "",
    photo: "",
    anniversary: "",
    jobTitle: msg.body.jobTitle === undefined || msg.body.jobTitle === null  ? "" : msg.body.jobTitle,
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