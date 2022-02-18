module.exports = {
  siteMetadata: {
    siteUrl: `https://willhawks.com/not-wordle`,
    title: `NOT NYT's Wordle`,
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
        icon: `src/images/grid.png`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-GSC8ZPG91C', // Google Analytics / GA
        ],
      },
    },
  ],
};
