/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { formatInTimeZone } = require('date-fns-tz');

exports.createPages = async function ({ actions, graphql }) {
  const date = formatInTimeZone(new Date(), 'America/Chicago', 'yyyy-MM-dd');

  actions.createPage({
    path: '/',
    component: require.resolve('./src/templates/index.js'),
    context: { date },
  });
};
