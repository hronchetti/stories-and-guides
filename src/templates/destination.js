import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, TabContainer } from "../components"

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
    <LayoutPhoto photo={coverPhoto.fluid} photoDesc={coverPhoto.title}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/destinations/${slug}`}
        image={seo.image.file.url}
      />
      <header className="wrapper-width">
        <h1 className="heading-extra-large">{name}</h1>
        <p className="heading-small">{introduction.introduction}</p>
      </header>
      <main className="wrapper-width">
        {guides && guides.length > 0 && (
          <section className="wrapper-height">
            <h2 className="heading-extra-small">Guides</h2>
            <section
              className={guides.length < 4 ? "grid-col-2" : "grid-col-4"}
            >
              {guides.map((guide) => (
                <PhotoCard
                  key={guide.contentful_id}
                  title={guide.name}
                  photo={guide.coverPhoto.fluid}
                  photoDesc={guide.coverPhoto.title}
                  to={`/guides/${guide.slug}/`}
                />
              ))}
            </section>
          </section>
        )}
        {featuredStories && featuredStories.length > 0 && (
          <section className="wrapper-height">
            <h2 className="heading-extra-small">
              Featured stories from {name}
            </h2>
            <section
              className={
                featuredStories.length < 4 ? "grid-col-2" : "grid-col-4"
              }
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
            </section>
          </section>
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
          <section className="wrapper-height">
            <h2 className="heading-extra-small">All stories from {name}</h2>
            <section
              className={
                nonFeaturedStories.length < 4 ? "grid-col-2" : "grid-col-4"
              }
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
            </section>
          </section>
        )}
        {otherDestinations && otherDestinations.length > 0 && (
          <section className="wrapper-width">
            <h2 className="heading-extra-small">
              Other destinations in {region}
            </h2>
            <section
              className={
                otherDestinations.length < 4 ? "grid-col-2" : "grid-col-4"
              }
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
            </section>
          </section>
        )}
      </main>
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
