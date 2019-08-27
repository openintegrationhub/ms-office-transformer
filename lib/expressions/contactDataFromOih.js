const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  console.log("+++ msg.body.data:   ", Object.assign({}, msg.body.data));
  
  const jsonataExpression =
  {
    "assistantName": "",
    "birthday": msg.body.data.birthday,
    "businessAddress": {
                          "postalCode": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "primary"})`).evaluate()).zipCode,
                          "countryOrRegion": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "primary"})`).evaluate()).country,
                          "state": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "primary"})`).evaluate()).region,
                          "city": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "primary"})`).evaluate()).city,
                          "street": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "primary"})`).evaluate()).street
                        },
    "businessHomePage": "",
    "businessPhones": (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v, $i, $a) {$v.description = "business" and $v.type = "phone"})`).evaluate()),
    "categories": [""],
    "changeKey": "",
    "children": [""],
    "companyName": "",
    "createdDateTime": "",
    "department": "",
    "displayName": msg.body.data.firstName &' '& msg.body.data.middleName != '' ||  msg.body.data.middleName != undefined ? msg.body.data.middleName : '' &' '& msg.body.data.lastName,
    "emailAddresses": (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v, $i, $a) {$v.description = "business" and $v.type = "email"})`).evaluate()).value,
    "fileAs": msg.body.data.firstName + ' ' + msg.body.data.middleName !== '' ||  msg.body.data.middleName !== undefined ? msg.body.data.middleName : '' + ' ' + msg.body.data.lastName,
    "generation": "",
    "givenName": msg.body.data.firstName,
    "homeAddress": {
                      "postalCode": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "private"})`).evaluate()).zipCode,
                      "countryOrRegion": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "private"})`).evaluate()).country,
                      "state": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "private"})`).evaluate()).region,
                      "city": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "private"})`).evaluate()).city,
                      "street": (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v, $i, $a) {$v.description = "private"})`).evaluate()).street,
                    },
    "homePhones": (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v, $i, $a) {$v.description = "private" and $v.type = "phone"})`).evaluate()).value,
    "id": "",
    "imAddresses": ["None"],
    "initials": "",
    "jobTitle": msg.body.data.jobTitle,
    "lastModifiedDateTime": "",
    "manager": "",
    "middleName": msg.body.data.middleName,
    "mobilePhone": (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v, $i, $a) {$v.description = "mobile" and $v.type = "phone"})`).evaluate()).value,
    "nickName": msg.body.data.nickname,
    "officeLocation": "",
    "otherAddress": {},
    "parentFolderId": "",
    "personalNotes": "",
    "profession": "",
    "spouseName": "",
    "surname": msg.body.data.lastName,
    "title": msg.body.data.title,
    "yomiCompanyName": "",
    "yomiGivenName": "",
    "yomiSurname": "",

    "photo": { }
  }

  return jsonataExpression;
}
