import React from "react"
import { graphql } from "gatsby"

import { Layout, PhotoCard, Seo } from "../components"

const Stories = ({ data }) => {
  console.log(data)
  const { siteUrl } = data.site.siteMetadata
  const stories = data.stories.edges
  const { heading, seo } = data.pageData

  return (
    <Layout heading={heading}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/stories/`}
        image={seo.image.file.url}
      />
      {stories && stories.length > 0 && (
        <section className={stories.length > 2 ? "grid-col-4" : "grid-col-2"}>
          {stories.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              title={node.title}
              to={`/stories/${node.slug}/`}
              date={node.createdAt}
            />
          ))}
        </section>
      )}
    </Layout>
  )
}

export default Stories

export const pageQuery = graphql`
  query getAllStories {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "nceRXdpw7lGRMrjgblA1R" }
    ) {
      heading
      seo {
        metaDescription {
          metaDescription
        }
        title
        image {
          file {
            url
          }
        }
      }
    }
    stories: allContentfulStories(sort: { order: ASC, fields: createdAt }) {
      edges {
        node {
          contentful_id
          slug
          coverPhoto {
            title
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
          }
          title
          createdAt
        }
      }
    }
  }
`
