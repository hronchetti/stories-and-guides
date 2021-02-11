import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, AccordionContainer } from "../components"

const SubGuideDestinationGuide = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    name,
    slug,
    introduction,
    coverPhoto,
    seo,
  } = data.subGuideDestinationGuide
  return (
    <LayoutPhoto
      heading={name}
      introduction={introduction.introduction}
      photo={coverPhoto.fluid}
      photoDesc={coverPhoto.title}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={
          siteUrl + `/guides/${data.guide.slug}/${data.subGuide.slug}/${slug}/`
        }
        image={seo.image.file.url}
      />
    </LayoutPhoto>
  )
}

export default SubGuideDestinationGuide

export const pageQuery = graphql`
  query getSubGuideDestinationGuide(
    $id: String!
    $guideId: String!
    $subGuideId: String!
  ) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    subGuideDestinationGuide: contentfulGuidesSubGuidesDestinationSubGuides(
      contentful_id: { eq: $id }
    ) {
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
    subGuide: contentfulGuidesSubGuides(contentful_id: { eq: $subGuideId }) {
      slug
    }
  }
`
