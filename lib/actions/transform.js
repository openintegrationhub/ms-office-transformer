const eioUtils = require('elasticio-node').messages;
const jsonata = require('@elastic.io/jsonata-moment');
const PASSTHROUGH_BODY_PROPERTY = 'elasticio';

module.exports.transform = (msg, exp) =>
{
  const stringifiedExpression = JSON.stringify(exp);
  const compiledExpression = jsonata(stringifiedExpression);

  handlePassthrough(msg);

  const result = compiledExpression.evaluate(exp);

  if (result === undefined || result === null || Object.keys(result).length === 0)
  {
    return Promise.resolve();
  }

  if (typeof result[Symbol.iterator] === 'function')
  {
    for (const item of result)
	{
      this.emit('data', eioUtils.newMessageWithBody(item));
    }

    return Promise.resolve();
  }

  return Promise.resolve(eioUtils.newMessageWithBody(result));
};

function handlePassthrough(message)
{
  if (message.passthrough && Object.keys(message.passthrough))
  {
    if (PASSTHROUGH_BODY_PROPERTY in message.body)
	{
      throw new Error(`${PASSTHROUGH_BODY_PROPERTY} property is reserved if you are using passthrough functionality`);
    }

    message.body.elasticio = {};
    Object.assign(message.body.elasticio, message.passthrough);
  }

  return message;
}