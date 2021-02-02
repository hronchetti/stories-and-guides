import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo } from "../components"

const Destination = ({ data }) => {
  const {
    coverPhoto,
    introduction,
    name,
    seo,
    slug,
    stories,
    usefulInformation,
  } = data.destination
  const { siteUrl } = data.site.siteMetadata

  return (
    <LayoutPhoto photo={coverPhoto.fluid} photoDesc={coverPhoto.title}>
      {console.log(stories)}
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + "/destinations/" + slug}
        image={seo.image.file.url}
      />
      <header className="wrapper-width">
        <h1 className="heading-extra-large">{name}</h1>
        <p className="heading-small">{introduction.introduction}</p>
      </header>
      <main className="wrapper-width">
        {stories.length > 0 && (
          <section>
            <h2 className="heading-extra-small">Guides</h2>
          </section>
        )}
      </main>
    </LayoutPhoto>
  )
}

export default Destination

export const pageQuery = graphql`
  query getDestination($id: String!, $region: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    destination: contentfulDestinations(contentful_id: { eq: $id }) {
      contentful_id
      coverPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      name
      slug
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
      introduction {
        introduction
      }
      usefulInformation {
        name
        heading
        photo {
          fluid(maxWidth: 2100) {
            ...GatsbyContentfulFluid
          }
          title
        }
        content {
          content
        }
      }
      region
      stories {
        slug
        title
        createdAt
        guideTags {
          slug
          name
          coverPhoto {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
      }
    }
    regionDesinations: allContentfulDestinations(
      filter: { region: { eq: $region } }
    ) {
      edges {
        node {
          name
          slug
          coverPhoto {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
      }
    }
  }
`
