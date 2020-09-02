const { newMessage, transformMicrosoftContactToOIHContact } = require('../helpers');

const { getExpression } = require('./../expressions/contactDataToOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    const result = transformMicrosoftContactToOIHContact(msg.body.data);
    return newMessage(result);
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
