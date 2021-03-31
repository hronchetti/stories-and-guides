require("dotenv").config()

// For module population
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// For checking if empty
const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    title: "Stories and Guides",
    description: "",
    author: "Ewan Rolfe",
    siteUrl: "https://storiesandguides.com/",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "ojMTzPC6_paBf0uzm937gWzO8jKtgisGD8Tg_MjFWlA",
        spaceId: "2sjv5arbct1a",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },

    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://storiesandguides.us1.list-manage.com/subscribe/post?u=703f9d68b80f56dfe2e7eb644&amp;id=2e5003cd07`, // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    /*     {
      resolve: `gatsby-source-instagram`,
      options: {
        access_token: `EAACyfYwmbbgBAD4azdt25VKA6QZACocKViyajt9OuKO2PjC2HvijMMB8VtGfB5oZCJfslMMgTOOEIZCZAVVIQJplgNFVzW3fUFSe310YFj6Ulf1wB40AZCK88omxSpZBNZCilTk5Oc2bqGCrqAwv82Axr6SKIinE8uRqpjZBj9Ti87rzKznWMKwFhHSA7ikqvqkZD`,
        instagram_id: `17841445553162630`,
      },
    }, */
  ],
}
