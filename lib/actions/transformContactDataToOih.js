const eioUtils = require('elasticio-node').messages;
const { getExpression } = require('./../expressions/contactDataToOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    const jsonataExpression = getExpression(msg);
    const result = await transform(msg, jsonataExpression);
    return eioUtils.newMessageWithBody(result.body);
  }
  catch (e)
  {
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;