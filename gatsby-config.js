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
        name: `NOT NYT's Wordle`,
        start_url: `/`,
        theme_color: `#EF4E58`,
        icon: `src/images/favicon.png`,
      },
    },
  ],
};
