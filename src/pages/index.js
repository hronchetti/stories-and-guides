import * as React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo } from "../components"

const IndexPage = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    heading,
    coverPhoto,
    introduction,
    contactSectionHeading,
    contactSectionButtonText,
    seo,
  } = data.homepage
  return (
    <LayoutPhoto
      photo={data.homepage.coverPhoto.fluid}
      photoDesc={data.homepage.coverPhoto.title}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl}
        image={seo.image.file.url}
      />
      <h1 className="heading-extra-large">{heading}</h1>
    </LayoutPhoto>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query getHomepage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    homepage: contentfulHomePage {
      heading
      coverPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      contactSectionHeading
      contactSectionButtonText
      introduction {
        introduction
      }
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
  }
`
