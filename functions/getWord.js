const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_KEY,
});
const base = Airtable.base('app8UrJKvRkUdKUI0');

function getWord() {
  return new Promise((resolve, reject) => {
    base('Words')
      .select({
        maxRecords: 1,
        view: 'Grid view',
        filterByFormula: `IS_SAME({Date}, DATETIME_FORMAT(
          SET_TIMEZONE(
            TODAY(), 'America/Chicago'),
          'M/D/Y'
        ), 'day')`,
      })
      .firstPage((error, records) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(records[0].fields);
      });
  });
}

module.exports = getWord;
