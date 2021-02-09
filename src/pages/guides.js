import React from "react"
import { graphql } from "gatsby"

import { Layout, PhotoCard, Seo } from "../components"

const Guides = ({ data }) => {
  console.log(data)
  const { siteUrl } = data.site.siteMetadata
  const guides = data.guides.edges
  const { heading, seo } = data.pageData

  return (
    <Layout heading="Guides">
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/guides/`}
        image={seo.image.file.url}
      />
      {guides && guides.length > 0 && (
        <section className={guides.length > 2 ? "grid-col-4" : "grid-col-2"}>
          {guides.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              title={node.name}
              to={`/guides/${node.slug}/`}
            />
          ))}
        </section>
      )}
    </Layout>
  )
}

export default Guides

export const pageQuery = graphql`
  query getAllGuides {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pageData: contentfulCollectionPage(
      contentful_id: { eq: "9z9k4V72w3jRmRFSI79vT" }
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
    guides: allContentfulGuides(sort: { order: ASC, fields: name }) {
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
