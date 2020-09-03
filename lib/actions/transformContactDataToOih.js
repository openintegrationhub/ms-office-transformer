const { newMessage, transformMicrosoftContactToOIHContact } = require('../helpers');

const { getExpression } = require('./../expressions/contactDataToOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    console.log('msg.body.data', msg.body.data);
    const result = transformMicrosoftContactToOIHContact(msg.body.data);
    const body = {
      data: result,
      meta: {
        recordUid: msg.body.data.id,
      }
    }
    const message = newMessage(body);

    console.log('Message:', message);
    return message;
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
