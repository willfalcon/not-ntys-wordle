const fs = require('fs');

exports.handler = async function (event, context) {
  const params = event.queryStringParameters;

  const found = await searchList(params.word);

  if (!found) {
    return {
      statusCode: 200,
      body: JSON.stringify({ found }),
    };
  }

  const word = 'about';
  const edition = 3;
  const correctArray = word.split('');
  const attempt = params.word.split('');

  const result = attempt.map((letter, index) => {
    if (correctArray[index] === letter) {
      return 'correct';
    } else if (correctArray.includes(letter)) {
      return 'kinda';
    } else {
      return 'wrong';
    }
  });

  const solved = result.filter(status => status !== 'correct');

  return {
    statusCode: 200,
    body: JSON.stringify({ result, solved: !solved.length, edition, found }),
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
