import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, TabsSection, Grid } from "../components"

const Destination = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata

  const {
    coverPhoto,
    featuredStories,
    destinationGuides,
    introduction,
    name,
    region,
    seo,
    slug,
    usefulInformation,
  } = data.destination

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

  const otherDestinations = data.otherDesinationsInRegion.edges

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
        url={siteUrl + `/destinations/${slug}`}
        image={seo.image && seo.image.file && seo.image.file.url}
      />
      {destinationGuides && destinationGuides.length > 0 && (
        <Grid itemCount={destinationGuides.length} heading="Guides">
          {destinationGuides.map((destinationGuide) => {
            if (destinationGuide.guides && destinationGuide.guides.length > 0) {
              return (
                <PhotoCard
                  key={destinationGuide.contentful_id}
                  title={destinationGuide.name}
                  photo={destinationGuide.coverPhoto.fluid}
                  photoDesc={destinationGuide.coverPhoto.title}
                  to={`/guides/${destinationGuide.guides[0].slug}/${destinationGuide.slug}/`}
                />
              )
            }
          })}
        </Grid>
      )}
      {featuredStories && featuredStories.length > 0 && (
        <Grid
          itemCount={featuredStories.length}
          heading={`Featured stories from ${name}`}
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
      {usefulInformation &&
        usefulInformation.tabs &&
        usefulInformation.tabs.length > 0 && (
          <TabsSection
            heading="Useful Information"
            tabs={usefulInformation.tabs}
          />
        )}
      {nonFeaturedStories && nonFeaturedStories.length > 0 && (
        <Grid
          itemCount={nonFeaturedStories.length}
          heading={`All stories from ${name}`}
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
      {otherDestinations && otherDestinations.length > 0 && (
        <Grid
          itemCount={nonFeaturedStories.length}
          heading={` Other destinations in ${region}`}
          linkText="All destinations"
          linkTo="/destinations/"
        >
          {otherDestinations.map(({ node }) => (
            <PhotoCard
              key={node.contentful_id}
              title={node.name}
              photo={node.coverPhoto.fluid}
              photoDesc={node.coverPhoto.title}
              to={`/destinations/${node.slug}/`}
            />
          ))}
        </Grid>
      )}
    </LayoutPhoto>
  )
}

export default Destination

export const pageQuery = graphql`
  query getDestination($id: String!, $region: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    destination: contentfulDestinations(contentful_id: { eq: $id }) {
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
      region
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
      destinationGuides {
        contentful_id
        name
        slug
        coverPhoto {
          title
          fluid(maxWidth: 2100) {
            ...GatsbyContentfulFluid
          }
        }
        guides {
          slug
        }
      }
      usefulInformation {
        tabs {
          contentful_id
          name
          heading
          photo {
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
            title
          }
          content {
            content
          }
        }
      }
    }
    stories: allContentfulStories(
      sort: { fields: updatedAt, order: ASC }
      filter: { destination: { contentful_id: { eq: $id } } }
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
    otherDesinationsInRegion: allContentfulDestinations(
      sort: { fields: name, order: ASC }
      filter: { region: { eq: $region }, contentful_id: { ne: $id } }
    ) {
      edges {
        node {
          contentful_id
          name
          slug
          coverPhoto {
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
      }
    }
  }
`
