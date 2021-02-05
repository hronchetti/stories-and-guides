import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo } from "../components"

const About = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    heading,
    coverPhoto,
    seo,
    introduction,
    contributor,
    sections,
  } = data.aboutPage

  return (
    <LayoutPhoto
      photo={data.aboutPage.coverPhoto.fluid}
      photoDesc={data.aboutPage.coverPhoto.title}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/about/`}
        image={seo.image.file.url}
      />
    </LayoutPhoto>
  )
}

export default About

export const pageQuery = graphql`
  query getAboutPage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    aboutPage: contentfulAboutPage {
      heading
      coverPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      introduction {
        introduction
      }
      contributor {
        content {
          content
        }
        heading
        contentful_id
      }
      sections {
        content {
          raw
        }
        heading
        contentful_id
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
