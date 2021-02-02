const path = require(`path`)

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allContentfulDestinations {
        edges {
          node {
            contentful_id
            slug
            region
          }
        }
      }
      allContentfulGuides {
        edges {
          node {
            contentful_id
            slug
          }
        }
      }
      allContentfulStories {
        edges {
          node {
            slug
            contentful_id
          }
        }
      }
    }
  `)

  // Destinations
  result.data.allContentfulDestinations.edges.forEach(({ node }) => {
    createPage({
      path: `/destinations/${node.slug}`,
      component: path.resolve(`src/templates/destination.js`),
      context: {
        id: node.contentful_id,
        region: node.region,
      },
    })
  })

  // Guides
  result.data.allContentfulGuides.edges.forEach(({ node }) => {
    createPage({
      path: `/guides/${node.slug}`,
      component: path.resolve(`src/templates/guide.js`),
      context: {
        id: node.contentful_id,
      },
    })
  })

  // Stories
  result.data.allContentfulStories.edges.forEach(({ node }) => {
    createPage({
      path: `/stories/${node.slug}`,
      component: path.resolve(`src/templates/story.js`),
      context: {
        id: node.contentful_id,
      },
    })
  })
}
