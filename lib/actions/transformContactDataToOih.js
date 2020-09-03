const { newMessage, transformMicrosoftContactToOIHContact } = require('../helpers');

const { getExpression } = require('./../expressions/contactDataToOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    const result = transformMicrosoftContactToOIHContact(msg.body.data);
    const body = {
      data: result,
      meta: {
        recordUid: msg.body.data.id,
      }
    }
    return newMessage(body);
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
