
const { newMessage, transformOIHContactToMicrosoftContact } = require('../helpers');

// const { getExpression } = require('./../expressions/contactDataFromOih.js');
const { transform } = require('./transform.js')

/**
 * This method will be called from the OIH platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 */

async function processAction(msg)
{
  try
  {
    const result = transformOIHContactToMicrosoftContact(msg.body.data);
    const body = {
      data: result,
      meta: msg.body.meta,
    }
    const message = newMessage(body);
    return message;
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
