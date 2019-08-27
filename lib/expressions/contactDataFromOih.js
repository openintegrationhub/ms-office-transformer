const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  console.log("+++ msg.body.data:   ", Object.assign({}, msg.body.data));
  
  const jsonataExpression =
  {
    "assistantName": "",
    "birthday": msg.body.data.birthday,
    "businessAddress": {
                          "postalCode": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).zipCode)`),
                          "countryOrRegion": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).country)`),
                          "state": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).region)`),
                          "city": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).city)`),
                          "street": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).street)`)
                        },
    "businessHomePage": "",
    "businessPhones": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "phone"}).value)`),
    "categories": [""],
    "changeKey": "",
    "children": [""],
    "companyName": "",
    "createdDateTime": "",
    "department": "",
    "displayName": msg.body.data.firstName &' '& msg.body.data.middleName != '' ||  msg.body.data.middleName != undefined ? msg.body.data.middleName : '' &' '& msg.body.data.lastName,
    "emailAddresses": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "email"}).value)`),
    "fileAs": msg.body.data.firstName + ' ' + msg.body.data.middleName !== '' ||  msg.body.data.middleName !== undefined ? msg.body.data.middleName : '' + ' ' + msg.body.data.lastName,
    "generation": "",
    "givenName": msg.body.data.firstName,
    "homeAddress": {
                      "postalCode": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).zipCode)`),
                      "countryOrRegion": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).country)`),
                      "state": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).region)`),
                      "city": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).city)`),
                      "street": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).street)`),
                    },
    "homePhones": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "private" and $v.type = "phone"}).value)`),
    "id": "",
    "imAddresses": ["None"],
    "initials": "",
    "jobTitle": msg.body.data.jobTitle,
    "lastModifiedDateTime": "",
    "manager": "",
    "middleName": msg.body.data.middleName,
    "mobilePhone": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "mobile" and $v.type = "phone"}).value)`),
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
