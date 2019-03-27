const jsonata = require('jsonata');

module.exports.getExpression = function(msg)
{
  const jsonataExpression =
      {
        {
          "otherAddress": {},
          "businessAddress": {
          "postalCode": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "primary"}).zipCode)`).evaluate(),
          "countryOrRegion": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "primary"}).country)`).evaluate(),
          "state": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "primary"}).region)`).evaluate(),
          "city": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "primary"}).city)`).evaluate(),
          "street": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "primary"}).zipCode)`).evaluate()
        },
      "homeAddress": {
  	    "postalCode": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "private"}).zipCode)`).evaluate(),
        "countryOrRegion": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "private"}).country)`).evaluate(),
        "state": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "private"}).region)`).evaluate(),
        "city": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "private"}).city)`).evaluate(),
        "street": jsonata(`$filter(msg.body.addresses, function($v, $i, $a) {$v.description = "private"}).zipCode)`).evaluate(),
      },
  "emailAddresses": [
    {
      "address": jsonata(`$filter(msg.body.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "email"}).value)`).evaluate(),
      "name": jsonata(`msg.body.firstName & ' ' & msg.body.lastName & ': ' & $filter(msg.body.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "email"}).value)`).evaluate()
    }
  ],
  "children": null,
  "personalNotes": null,
  "spouseName": null,
  "businessPhones": jsonata(`$filter(msg.body.contactData, function($v, $i, $a) {$v.description = "business" and $v.type = "phone"}).value)`).evaluate(),
  "mobilePhone": jsonata(`$filter(msg.body.contactData, function($v, $i, $a) {$v.description = "mobile" and $v.type = "phone"}).value)`).evaluate(),
  "homePhones": jsonata(`$filter(msg.body.contactData, function($v, $i, $a) {$v.description = "private" and $v.type = "phone"}).value)`).evaluate(),
  "manager": null,
  "assistantName": null,
  "businessHomePage": null,
  "profession": null,
  "officeLocation": null,
  "department": "",
  "companyName": msg.body.name,
  "jobTitle": msg.body.jobTitle,
  "imAddresses": [
    "None"
  ],
  "generation": null,
  "yomiCompanyName": null,
  "yomiSurname": null,
  "yomiGivenName": null,
  "title": msg.body.title,
  "surname": msg.body.lastName,
  "nickName": msg.body.nickname,
  "middleName": msg.body.middleName,
  "initials": null,
  "givenName": msg.body.firstName,
  "displayName": msg.body.firstName &' '& msg.body.lastName,
  "fileAs": msg.body.firstName &' '& msg.body.lastName ,
  "birthday": msg.body.anniversary,
  "parentFolderId": null,
  "categories": [],
  "changeKey": null,
  "lastModifiedDateTime": msg.body.oihApplicationRecords.lastModified.timestamp,
  "createdDateTime": msg.body.oihApplicationRecords.created.timestamp,
  "id": null
}:

  return jsonataExpression;
}
