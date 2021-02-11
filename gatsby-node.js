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
      allContentfulGuidesDestinationGuides {
        edges {
          node {
            contentful_id
            slug
            guides {
              contentful_id
              slug
            }
          }
        }
      }
      allContentfulGuidesSubGuides {
        edges {
          node {
            contentful_id
            slug
            guides {
              contentful_id
              slug
            }
          }
        }
      }
      allContentfulGuidesSubGuidesDestinationSubGuides {
        edges {
          node {
            slug
            contentful_id
            guides___sub_guides {
              contentful_id
              slug
              guides {
                contentful_id
                slug
              }
            }
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

  // Sub Guides
  result.data.allContentfulGuidesSubGuides.edges.forEach(({ node }) => {
    if (node.guides && node.guides.length > 0) {
      node.guides.forEach((guide) => {
        createPage({
          path: `/guides/${guide.slug}/${node.slug}`,
          component: path.resolve(`src/templates/sub-guide.js`),
          context: {
            id: node.contentful_id,
            guideId: guide.contentful_id,
          },
        })
      })
    }
  })

  // Destination Guides
  result.data.allContentfulGuidesDestinationGuides.edges.forEach(({ node }) => {
    if (node.guides && node.guides.length > 0) {
      node.guides.forEach((guide) => {
        createPage({
          path: `/guides/${guide.slug}/${node.slug}`,
          component: path.resolve(`src/templates/destination-guide.js`),
          context: {
            id: node.contentful_id,
            guideId: guide.contentful_id,
          },
        })
      })
    }
  })

  // // Destination Sub Guides
  result.data.allContentfulGuidesSubGuidesDestinationSubGuides.edges.forEach(
    ({ node }) => {
      if (node.guides___sub_guides && node.guides___sub_guides.length > 0) {
        node.guides___sub_guides.forEach((subGuide) => {
          if (subGuide.guides && subGuide.guides.length > 0) {
            subGuide.guides.forEach((guide) => {
              createPage({
                path: `/guides/${guide.slug}/${subGuide.slug}/${node.slug}/`,
                component: path.resolve(
                  `src/templates/sub-guide-destination-guide.js`
                ),
                context: {
                  id: node.contentful_id,
                  guideId: guide.contentful_id,
                  subGuideId: subGuide.contentful_id,
                },
              })
            })
          }
        })
      }
    }
  )

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
