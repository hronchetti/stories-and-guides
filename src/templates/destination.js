import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, TabContainer, Grid } from "../components"

const Destination = ({ data }) => {
  console.log(data.destination)
  const { siteUrl } = data.site.siteMetadata

  const {
    coverPhoto,
    featuredStories,
    guides,
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
        image={seo.image.file.url}
      />
      {guides && guides.length > 0 && (
        <Grid itemCount={guides.length} heading="Guides">
          {guides.map((guide) => (
            <PhotoCard
              key={guide.contentful_id}
              title={guide.name}
              photo={guide.coverPhoto.fluid}
              photoDesc={guide.coverPhoto.title}
              to={`/guides/${guide.slug}/`}
            />
          ))}
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
          <section className="wrapper-height">
            <h2 className="heading-medium">Useful information</h2>
            <TabContainer tabs={usefulInformation.tabs} />
          </section>
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
      guides {
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
      filter: { region: { eq: $region }, contentful_id: { ne: $id } }
    ) {
      edges {
        node {
          contentful_id
          name
          slug
          coverPhoto {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid
            }
            title
          }
        }
      }
    }
  }
`
