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

const jsonata = require('jsonata');

module.exports.getExpression = msg =>
{
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object)
  {
    return msg.body;
  }

  const expression =
  {
    oihUid: '',
    oihCreated: '',
    oihLastModified: '',
    oihApplicationRecords:
	[{
      applicationUid: '',
      recordUid: msg.body.rowid
    }],
    meta_data:
	{
      prim_uid: msg.body.meta_data.prim_uid,
      company_uid: msg.body.meta_data.company_uid,
      last_update: lastModifications ? lastModifications.lastModified.timestamp : '',
      document_number: msg.body.meta_data.document_number,
      document_date: msg.body.meta_data.document_date,
      document_due_date: msg.body.meta_data.document_due_date,
      net_amount: msg.body.meta_data.net_amount,
      vat: msg.body.meta_data.vat,
      gross_amount: msg.body.meta_data.gross_amount,
      currency: msg.body.meta_data.currency,
      is_archived: msg.body.meta_data.is_archived,
      is_ocr_completed: msg.body.meta_data.is_ocr_completed,
      tags: msg.body.meta_data.tags,
      note: msg.body.meta_data.note,
      source: msg.body.meta_data.source,
      filename: msg.body.meta_data.filename,
      file_size: msg.body.meta_data.file_size,
      payment_status: msg.body.meta_data.payment_status,
      payment_method: msg.body.meta_data.payment_method,
      attachments: msg.body.meta_data.attachments,
      payment_details:
	  {
          card_number: msg.body.meta_data.payment_details.card_number,
          cash_discount_date: msg.body.meta_data.payment_details.cash_discount_date,
          cash_discount_value: msg.body.meta_data.payment_details.cash_discount_value
      }
    },

    file_content: msg.body.file_content
  };

  return expression;
};