import React from "react"
import { graphql } from "gatsby"

import {
  Grid,
  LayoutPhoto,
  Seo,
  PhotoCard,
  AccordionContainer,
} from "../components"

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
    destinationSubGuides,
  } = data.subGuide

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
        <Grid itemCount={destinationSubGuides.length} heading="Destinations">
          {destinationSubGuides.map((destinationSubGuide) => (
            <PhotoCard
              key={destinationSubGuide.contentful_id}
              title={destinationSubGuide.name}
              photo={destinationSubGuide.coverPhoto.fluid}
              photoDesc={destinationSubGuide.coverPhoto.title}
              to={`/guides/${data.guide.slug}/${slug}/${destinationSubGuide.slug}/`}
            />
          ))}
        </Grid>
      )}
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
      destinationSubGuides {
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
