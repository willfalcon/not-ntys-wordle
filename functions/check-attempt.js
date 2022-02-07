exports.handler = async function (event, context) {
  const word = 'blank';
  const edition = 2;
  const params = event.queryStringParameters;

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
    body: JSON.stringify({ result, solved: !solved.length, edition }),
  };
};
