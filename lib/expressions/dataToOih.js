/**
 * Copyright GetMyInvoices

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*** modified by agindo GmbH ***/

'use strict';

const jsonata = require('jsonata');

module.exports.getExpression = msg =>
{
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object)
  {
    return msg.body;
  }

  const expression = {
    "title": msg.body.companyName,
    "firstName": msg.body.surname,
    "lastName": msg.body.givenName,
    "contactData":
    [
      {
        value: msg.body.emailAddresses.address,
        type: 'email'
      }
    ],
    "time": msg.body.time,
    "description": msg.body.subject,
    "body":
    {
      "content": msg.body.body.content,
    },
    "start":
    {
      "dateTime": msg.body.start.dateTime,
    },
    "end":
    {
      "dateTime": msg.body.end.dateTime,
    }
  };

  return expression;
};