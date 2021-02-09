import React from "react"
import { graphql } from "gatsby"

import {
  LayoutPhoto,
  Seo,
  PhotoCard,
  AccordionContainer,
  Grid,
} from "../components"

const Guide = ({ data }) => {
  console.log(data.guide)
  const { siteUrl } = data.site.siteMetadata

  const {
    accordions,
    coverPhoto,
    featuredStories,
    introduction,
    name,
    seo,
    slug,
    subGuides,
  } = data.guide

  const stories = data.stories.edges

  const nonFeaturedStories =
    stories &&
    stories.filter(
      ({ node }) =>
        featuredStories &&
        featuredStories.some(
          (featuredStory) => node.contentful_id !== featuredStory.contentful_id
        )
    )

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
        url={siteUrl + `/guides/${slug}`}
        image={seo.image.file.url}
      />
      {subGuides && subGuides.length > 0 && (
        <Grid items={featuredStories} heading={`Types of ${name}`}>
          {subGuides.map((subGuide) => (
            <PhotoCard
              key={subGuide.contentful_id}
              title={subGuide.name}
              photo={subGuide.coverPhoto.fluid}
              photoDesc={subGuide.coverPhoto.title}
              to={`/guides/${slug}/${subGuide.slug}/`}
            />
          ))}
        </Grid>
      )}
      {featuredStories && featuredStories.length > 0 && (
        <Grid items={featuredStories} heading={`Featured ${name} stories`}>
          {featuredStories.map((featuredStory) => (
            <PhotoCard
              key={featuredStory.contentful_id}
              title={featuredStory.title}
              photo={featuredStory.coverPhoto.fluid}
              photoDesc={featuredStory.coverPhoto.title}
              to={`/stories/${featuredStory.slug}/`}
              date={featuredStory.createdAt}
            />
          ))}
        </Grid>
      )}
      {accordions &&
        accordions.accordions &&
        accordions.accordions.length > 0 && (
          <AccordionContainer
            heading={accordions.heading}
            accordions={accordions.accordions}
          />
        )}
      {nonFeaturedStories && nonFeaturedStories.length > 0 && (
        <Grid
          items={nonFeaturedStories}
          heading={`All ${name} stories`}
          linkText="All stories"
          linkTo="/stories/"
        >
          {nonFeaturedStories.map((featuredStory) => (
            <PhotoCard
              key={featuredStory.contentful_id}
              title={featuredStory.title}
              photo={featuredStory.coverPhoto.fluid}
              photoDesc={featuredStory.coverPhoto.title}
              to={`/stories/${featuredStory.slug}/`}
              date={featuredStory.createdAt}
            />
          ))}
        </Grid>
      )}
    </LayoutPhoto>
  )
}

export default Guide

export const pageQuery = graphql`
  query getGuide($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    guide: contentfulGuides(contentful_id: { eq: $id }) {
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
      subGuides {
        contentful_id
        name
        slug
        coverPhoto {
          title
          fluid(maxWidth: 1000) {
            ...GatsbyContentfulFluid
          }
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
    stories: allContentfulStories(
      filter: { guides: { elemMatch: { contentful_id: { eq: $id } } } }
    ) {
      edges {
        node {
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
      }
    }
  }
`
