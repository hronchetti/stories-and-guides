import React from "react"
import { graphql } from "gatsby"

import {
  Grid,
  LayoutPhoto,
  Seo,
  PhotoCard,
  AccordionContainer,
} from "../components"

const DestinationGuide = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    name,
    slug,
    seo,
    introduction,
    coverPhoto,
    destinationSubGuides,
    destinationSubGuidesHeading,
  } = data.destinationGuide
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
        url={siteUrl + `/guides/${data.guide.slug}/${slug}/`}
        image={seo.image.file.url}
      />
      {destinationSubGuides && destinationSubGuides.length > 0 && (
        <Grid
          itemCount={destinationSubGuides.length}
          heading={
            destinationSubGuidesHeading
              ? destinationSubGuidesHeading
              : `Types of ${name}`
          }
        >
          {destinationSubGuides.map((destinationSubGuide) => (
            <PhotoCard
              key={destinationSubGuide.contentful_id}
              title={destinationSubGuide.name}
              photo={destinationSubGuide.coverPhoto.fluid}
              photoDesc={destinationSubGuide.coverPhoto.title}
              to={`/guides/${data.guide.slug}/${destinationSubGuide.guides___sub_guides[0].slug}/${destinationSubGuide.slug}/`}
            />
          ))}
        </Grid>
      )}
    </LayoutPhoto>
  )
}

export default DestinationGuide

export const pageQuery = graphql`
  query getDestinationGuide($id: String!, $guideId: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    destinationGuide: contentfulGuidesDestinationGuides(
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
      destinationSubGuidesHeading
      destinationSubGuides {
        contentful_id
        name
        slug
        coverPhoto {
          title
          fluid(maxWidth: 1000) {
            ...GatsbyContentfulFluid
          }
        }
        guides___sub_guides {
          slug
        }
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
