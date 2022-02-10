const getWord = require('./getWord');

exports.handler = async function (event, context) {
  const word = await getWord();
  console.log(word);

  return {
    statusCode: 200,
    body: JSON.stringify(word.Word),
  };
};
