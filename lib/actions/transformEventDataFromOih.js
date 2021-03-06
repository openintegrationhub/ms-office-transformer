const { newMessage } = require('../helpers');

const { getExpression } = require('./../expressions/eventDataFromOih.js');
const { transform } = require('./transform.js')

async function processAction(msg)
{
  try
  {
    const jsonataExpression = getExpression(msg);
    const result = await transform(msg, jsonataExpression);
    return newMessage(result.body);
  }
  catch (e)
  {
    console.log(`ERROR MESSAGE: ${e.message}`);
    console.log(`ERROR STACK: ${e.stack}`);
    console.log(`ERROR CODE: ${e.code}`);
  }
}

module.exports.process = processAction;
