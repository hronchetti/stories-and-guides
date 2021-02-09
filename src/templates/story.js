import React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"

import { LayoutPhoto, Seo, PhotoCard, Grid } from "../components"

const Story = ({ data }) => {
  console.log(data.story)
  const { siteUrl } = data.site.siteMetadata

  const {
    coverPhoto,
    createdAt,
    introduction,
    relatedStories,
    seo,
    slug,
    title,
  } = data.story
  return (
    <LayoutPhoto
      heading={title}
      date={format(parseISO(createdAt), "dd.MM.y")}
      introduction={introduction.introduction}
      photo={coverPhoto.fluid}
      photoDesc={coverPhoto.title}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/stories/${slug}/`}
        image={seo.image.file.url}
      />
      {relatedStories && relatedStories.length > 0 && (
        <Grid
          items={relatedStories}
          heading="More stories like this"
          linkText="All stories"
          linkTo="/stories/"
        >
          {relatedStories.map((relatedStory) => (
            <PhotoCard
              key={relatedStory.contentful_id}
              title={relatedStory.title}
              photo={relatedStory.coverPhoto.fluid}
              photoDesc={relatedStory.coverPhoto.title}
              to={`/stories/${relatedStory.slug}/`}
              date={relatedStory.createdAt}
            />
          ))}
        </Grid>
      )}
    </LayoutPhoto>
  )
}

export default Story

export const pageQuery = graphql`
  query getStory($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    story: contentfulStories(contentful_id: { eq: $id }) {
      contentful_id
      slug
      title
      createdAt
      coverPhoto {
        title
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
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
      introduction {
        introduction
      }
      sections {
        ... on ContentfulAccordionGroups {
          heading
          accordions {
            name
            content {
              content
            }
          }
          contentful_id
        }
        ... on ContentfulStoriesPhotoGalleries {
          photos {
            fluid {
              ...GatsbyContentfulFluid
            }
            title
            contentful_id
          }
        }
        ... on ContentfulStoriesPhotosSection {
          photos {
            contentful_id
            fluid {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
        ... on ContentfulStoriesQuoteSections {
          author
          quote {
            quote
          }
          contentful_id
        }
        ... on ContentfulStoriesTextSection {
          id
          contentful_id
          content {
            raw
          }
          heading
        }
      }
      relatedStories {
        contentful_id
        slug
        title
        createdAt
        coverPhoto {
          title
          fluid(maxWidth: 2100) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
