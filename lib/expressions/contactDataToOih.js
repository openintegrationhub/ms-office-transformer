const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  function mapMicrosoftAddressDataToOIH(addresses) {
    let addr = [];

    addresses.forEach(a => {
      addr.push({
        street: a.street !== undefined || a.street === null  ? a.street : "",
        streetNumber:  0,
        unit:  "",
        zipCode: a.postalCode !== undefined || a.po === null  ? a.postalCode : "",
        city: a.city !== undefined || a.city === null  ? a.city : "",
        district: a.state !== undefined || a.state === null  ? a.state : "",
        region: a.countryOrRegion !== undefined || a.countryOrRegion === null  ? a.countryOrRegion : "",
        country:  "",
        countryCode:  "",
        primaryContact:  "",
      })
    });
    return addr;
  }

  function mapContactDataToOIH(emailAddresses, homePhones, imAddresses, mobilePhone) {
    let cd = [];

    // map email addresses
    cd.concat(emailAddresses.map(email => {
      return {
                value: email.address === undefined || email.address === null  ? "" : email.address,
                type: "email",
                label: email.name === undefined || email.name === null  ? "" : email.name,
                description: "email address"
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
    meta: {
      recordUid: msg.body.meta.recordUid,
      applicationUid: (msg.body.meta.applicationUid!=undefined && msg.body.meta.applicationUid!=null) ? msg.body.meta.applicationUid : 'appUid not set yet',
      iamToken: (msg.body.meta.iamToken!=undefined && msg.body.meta.iamToken!=null) ? msg.body.meta.iamToken : 'iamToken not set yet',
      domainId: 'TO BE ADDED',
      schemaURI: 'TO BE ADDED'
    },
    data: {
      title: msg.body.data.title === undefined || msg.body.data.title === null  || msg.body.data.title === null  ? "" : msg.body.data.title,  
      salutation: msg.body.data.salutation === undefined || msg.body.data.salutation === null  ? "" : msg.body.data.salutation,
      firstName: msg.body.data.firstName === undefined || msg.body.data.firstName === null  ? "" : msg.body.data.firstName,
      middleName: msg.body.data.middleName === undefined || msg.body.data.middleName === null  ? "" : msg.body.data.middleName,
      lastName: msg.body.data.lastName === undefined || msg.body.data.lastName === null  ? "" : msg.body.data.lastName,
      displayName:  msg.body.data.displayName === undefined || msg.body.data.displayName === null  ? "" : msg.body.data.displayName,
      gender: "",
      birthday: msg.body.data.birthday === undefined || msg.body.data.birthday === null  ? "" : msg.body.data.birthday,
      notes: msg.body.data.personalNotes === undefined || msg.body.data.personalNotes === null  ? "" : msg.body.data.personalNotes,
      language: "",
      nickname: "",
      photo: "",
      anniversary: "",
      jobTitle: msg.body.data.jobTitle === undefined || msg.body.data.jobTitle === null  ? "" : msg.body.data.jobTitle,
      addresses: mapMicrosoftAddressDataToOIH([msg.body.data.homeAddress, msg.body.data.businessAddress, msg.body.data.otherAddress]),
      contactData: mapContactDataToOIH(msg.body.data.emailAddresses, msg.body.data.homePhones, msg.body.data.imAddresses, msg.body.data.mobilePhone),
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
    }
  };

  return jsonataExpression;
}