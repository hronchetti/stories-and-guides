import React from "react"
import { graphql } from "gatsby"

import { Layout, Seo, RichText } from "../components"

const PrivacyPolicy = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { heading, content, seo } = data.privacyPolicy

  return (
    <Layout heading={heading}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl}
        image={seo.image && seo.image.file && seo.image.file.url}
      />
      <RichText content={content} />
    </Layout>
  )
}

export default PrivacyPolicy

export const pageQuery = graphql`
  query getPrivacyPolicy {
    site {
      siteMetadata {
        siteUrl
      }
    }
    privacyPolicy: contentfulPrivacyPolicy {
      heading
      content {
        raw
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
