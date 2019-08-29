const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
  
  const jsonataExpression =
  {
    assistantName: "",
    birthday: msg.body.data.birthday,
    businessAddress: {
                          "postalCode": (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "primary"})`).evaluate()).zipCode,
                          "countryOrRegion": (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "primary"})`).evaluate()).country,
                          "state": (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "primary"})`).evaluate()).region,
                          "city": (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "primary"})`).evaluate()).city,
                          "street": (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "primary"})`).evaluate()).street
                        },
    businessHomePage: "",
    businessPhones: (jsonata(`$filter(msg.body.data.contactData, function($v) {$v.description = "business" and $v.type = "phone"})`).evaluate()),
    categories: [""],
    changeKey: "",
    children: [""],
    companyName: "",
    createdDateTime: "",
    department: "",
    displayName: msg.body.data.firstName &' '& msg.body.data.middleName != '' ||  msg.body.data.middleName != undefined ? msg.body.data.middleName : '' &' '& msg.body.data.lastName,
    emailAddresses: (jsonata(`$filter(msg.body.data.contactData, function($v) {$v.type = "email"})`).evaluate()).value,
    fileAs: msg.body.data.firstName + ' ' + msg.body.data.middleName !== '' ||  msg.body.data.middleName !== undefined ? msg.body.data.middleName : '' + ' ' + msg.body.data.lastName,
    generation: "",
    givenName: msg.body.data.firstName,
    homeAddress: {
                      postalCode: (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "mailing"})`).evaluate()).zipCode,
                      countryOrRegion: (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "mailing"})`).evaluate()).country,
                      state: (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "mailing"})`).evaluate()).region,
                      city: (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "mailing"})`).evaluate()).city,
                      street: (jsonata(`$filter(msg.body.data.addresses, function($v) {$v.description = "mailing"})`).evaluate()).street,
                    },
    homePhones: (jsonata(`$filter(msg.body.data.contactData, function($v) {$v.description = "private" and $v.type = "phone"})`).evaluate()).value,
    id: "",
    imAddresses: ["None"],
    initials: "",
    jobTitle: msg.body.data.jobTitle,
    lastModifiedDateTime: "",
    manager: "",
    middleName: msg.body.data.middleName,
    mobilePhone: (jsonata(`$filter(msg.body.data.contactData, function($v) {$v.description = "mobile" and $v.type = "phone"})`).evaluate()).value,
    nickName: msg.body.data.nickname,
    officeLocation: "",
    otherAddress: {},
    parentFolderId: "",
    personalNotes: "",
    profession: "",
    spouseName: "",
    surname: msg.body.data.lastName,
    title: msg.body.data.title,
    yomiCompanyName: "",
    yomiGivenName: "",
    yomiSurname: "",

    photo: { }
  }

  return jsonataExpression;
}
