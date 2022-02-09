module.exports = {
  siteMetadata: {
    siteUrl: `https://willhawks.com/not-wordle`,
    title: `NOT NYT's Wordle`,
    edition: 4,
    word: 'month',
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-image',
      options: {
        defaults: {
          placeholder: 'dominantColor',
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Skwahdle`,
        start_url: `/`,
        theme_color: `#5D1725`,
        icon: `src/images/favicon.png`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
