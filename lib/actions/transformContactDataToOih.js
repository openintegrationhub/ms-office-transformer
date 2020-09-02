const { newMessage, transformMicrosoftContactToOIHContact } = require('../helpers');

const { getExpression } = require('./../expressions/contactDataToOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    console.log(msg);
    console.log('msg.body', msg.body);
    const result = transformMicrosoftContactToOIHContact(msg.body.data);
    console.log('Transformation-Result:', result);
    return newMessage(result);
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
