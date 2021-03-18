import React from "react"
import { graphql } from "gatsby"

import {
  AccordionsSection,
  Grid,
  LayoutPhoto,
  PhotoCard,
  Seo,
} from "../components"

const DestinationGuide = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    accordions,
    coverPhoto,
    destinationSubGuides,
    destinationSubGuidesHeading,
    featuredStories,
    introduction,
    name,
    seo,
    slug,
  } = data.destinationGuide

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
      {featuredStories && featuredStories.length > 0 && (
        <Grid
          itemCount={featuredStories.length}
          heading={`Featured ${name} stories`}
        >
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
          <AccordionsSection
            heading={accordions.heading}
            accordions={accordions.accordions}
          />
        )}
      {nonFeaturedStories && nonFeaturedStories.length > 0 && (
        <Grid
          itemCount={nonFeaturedStories.length}
          heading={`All ${name} stories`}
          linkText="All stories"
          linkTo="/stories/"
        >
          {nonFeaturedStories.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              title={node.title}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              to={`/stories/${node.slug}/`}
              date={node.createdAt}
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
          contentful_id
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
    stories: allContentfulStories(
      filter: {
        destinationGuides: { elemMatch: { contentful_id: { eq: $id } } }
      }
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
