import React from "react"
import { graphql } from "gatsby"

import {
  Grid,
  LayoutPhoto,
  Seo,
  PhotoCard,
  AccordionsSection,
} from "../components"

const SubGuide = ({ data }) => {
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
        image={seo.image && seo.image.file && seo.image.file.url}
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
        destinationSubGuides: {
          elemMatch: {
            guides___sub_guides: { elemMatch: { contentful_id: { eq: $id } } }
          }
        }
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
