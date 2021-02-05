import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, AccordionContainer } from "../components"

const SubGuide = ({ data }) => {
  console.log(data.subGuide)
  const { siteUrl } = data.site.siteMetadata

  const {
    accordions,
    coverPhoto,
    featuredStories,
    introduction,
    name,
    seo,
    slug,
    destinations,
  } = data.subGuide

  return (
    <LayoutPhoto photo={coverPhoto.fluid} photoDesc={coverPhoto.title}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/guides/${data.guide.slug}/${slug}/`}
        image={seo.image.file.url}
      />
    </LayoutPhoto>
  )
}

export default SubGuide

export const pageQuery = graphql`
  query getSubGuide($id: String!, $guideId: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    subGuide: contentfulGuidesSubGuides(contentful_id: { eq: $id }) {
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
      destinations {
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
      featuredStories {
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
      accordions {
        heading
        accordions {
          content {
            content
          }
          name
        }
      }
    }
    guide: contentfulGuides(contentful_id: { eq: $guideId }) {
      slug
    }
  }
`
