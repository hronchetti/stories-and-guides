import React from "react"
import { graphql } from "gatsby"

import { Layout, PhotoCard, Seo } from "../components"

const Destinations = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const destinations = data.destinations.edges
  const { heading, seo } = data.pageData

  return (
    <Layout heading={heading}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/destinations/`}
        image={seo.image.file.url}
      />
      {destinations && destinations.length > 0 && (
        <section
          className={destinations.length > 2 ? "grid-col-4" : "grid-col-2"}
        >
          {destinations.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              title={node.name}
              to={`/destinations/${node.slug}/`}
            />
          ))}
        </section>
      )}
    </Layout>
  )
}

export default Destinations

export const pageQuery = graphql`
  query getAllDestinations {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "XXnCamqqRwCYe0ZvmhtLT" }
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
    destinations: allContentfulDestinations(
      sort: { order: ASC, fields: name }
    ) {
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
          name
        }
      }
    }
  }
`
