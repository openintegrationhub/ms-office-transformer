const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{

  console.log("+++ msg.body.data:   ", Object.assign({}, msg.body.data));
  
  const jsonataExpression =
  {
    "assistantName": "",
    "birthday": msg.body.data.birthday,
    "businessAddress": {
                          "postalCode": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).zipCode)`).evaluate(),
                          "countryOrRegion": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).country)`).evaluate(),
                          "state": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).region)`).evaluate(),
                          "city": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).city)`).evaluate(),
                          "street": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "primary"}).street)`).evaluate()
                        },
    "businessHomePage": "",
    "businessPhones": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "phone"}).value)`).evaluate(),
    "categories": [""],
    "changeKey": "",
    "children": [""],
    "companyName": "",
    "createdDateTime": "",
    "department": "",
    "displayName": msg.body.data.firstName &' '& msg.body.data.middleName != '' ||  msg.body.data.middleName != undefined ? msg.body.data.middleName : '' &' '& msg.body.data.lastName,
    "emailAddresses": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "email"}).value)`).evaluate(),
    "fileAs": msg.body.data.firstName + ' ' + msg.body.data.middleName !== '' ||  msg.body.data.middleName !== undefined ? msg.body.data.middleName : '' + ' ' + msg.body.data.lastName,
    "generation": "",
    "givenName": msg.body.data.firstName,
    "homeAddress": {
                      "postalCode": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).zipCode)`).evaluate(),
                      "countryOrRegion": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).country)`).evaluate(),
                      "state": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).region)`).evaluate(),
                      "city": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).city)`).evaluate(),
                      "street": jsonata(`$filter(msg.body.data.addresses, function($v, $i, $a) {$v.description = "private"}).street)`).evaluate(),
                    },
    "homePhones": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "private" and $v.type = "phone"}).value)`).evaluate(),
    "id": "",
    "imAddresses": ["None"],
    "initials": "",
    "jobTitle": msg.body.data.jobTitle,
    "lastModifiedDateTime": "",
    "manager": "",
    "middleName": msg.body.data.middleName,
    "mobilePhone": jsonata(`$filter(msg.body.data.contactData, function($v, $i, $a) {$v.description = "mobile" and $v.type = "phone"}).value)`).evaluate(),
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
