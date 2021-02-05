import React from "react"
import { graphql } from "gatsby"

import { Layout, Seo } from "../components"

const Contact = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { seo, contactFormHeading, contactFormPhoto } = data.contactPage
  return (
    <Layout heading="Contact">
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/contact/`}
        image={seo.image.file.url}
      />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query getContactPage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contactPage: contentfulContactPage {
      contactFormPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      contactFormHeading
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
