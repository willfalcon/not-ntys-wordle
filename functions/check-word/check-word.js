const fs = require('fs');

exports.handler = async function (event, context) {
  const params = event.queryStringParameters;

  const found = await searchList(params.word);

  return {
    statusCode: 200,
    body: JSON.stringify({ found }),
  };
};

function searchList(word) {
  return new Promise(resolve => {
    const contents = fs.readFileSync(require.resolve('./words5.txt'));
    const lines = contents.toString().split('\n');
    const isAWord = lines.includes(word);
    resolve(isAWord);
  });
}
