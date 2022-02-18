const fs = require('fs');
const getWord = require('./getWord');

exports.handler = async function (event) {
  const params = event.queryStringParameters;

  const found = await searchList(params.word);

  if (!found) {
    return {
      statusCode: 200,
      body: JSON.stringify({ found }),
    };
  }

  const record = await getWord().catch(err => console.error({ err }));
  const word = record.Word;
  const correctArray = word.split('');
  const attempt = params.word.split('');

  const reference = attempt.map((letter, index) => ({
    attempt: letter,
    index,
    correct: correctArray[index],
    status: correctArray[index] === letter ? 'correct' : correctArray.includes(letter) ? 'kinda' : 'wrong',
  }));

  const result = reference.map((letter, index) => {
    // if this is the right letter in the right spot, return correct regardless
    if (letter.status === 'correct') {
      return 'correct';
    }
    // if this is a right letter in the wrong spot,
    if (letter.status === 'kinda') {
      // if this is a correct letter in the wrong spot, but all the correct instances are account for, return false
      if (!reference.filter(ref => ref.correct == letter.attempt && ref.status != 'correct').length) {
        return 'wrong';
      }

      return 'kinda';
    } else {
      return 'wrong';
    }
  });

  const solved = result.filter(status => status !== 'correct');

  return {
    statusCode: 200,
    body: JSON.stringify({ result, solved: !solved.length, found }),
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
