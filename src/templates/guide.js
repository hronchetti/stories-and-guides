import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, AccordionContainer } from "../components"

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
    stories,
    subGuides,
  } = data.guide

  const nonFeaturedStories = stories.filter((story) =>
    featuredStories.some(
      (featuredStory) => story.contentful_id !== featuredStory.contentful_id
    )
  )

  return (
    <LayoutPhoto photo={coverPhoto.fluid} photoDesc={coverPhoto.title}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + "/guides/" + slug}
        image={seo.image.file.url}
      />
      <header className="wrapper-width">
        <h1 className="heading-extra-large">{name}</h1>
        <p className="heading-small">{introduction.introduction}</p>
      </header>
      <main className="wrapper-width">
        {subGuides && subGuides.length > 0 && (
          <section className="wrapper-height">
            <h2 className="heading-extra-small">Guides</h2>
            <section
              className={subGuides.length < 4 ? "grid-col-2" : "grid-col-4"}
            >
              {subGuides.map((guide) => (
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
        {accordions &&
          accordions.accordions &&
          accordions.accordions.length > 0 && (
            <AccordionContainer
              heading={accordions.heading}
              accordions={accordions.accordions}
            />
          )}
        {nonFeaturedStories && nonFeaturedStories.length > 0 && (
          <section className="wrapper-height">
            <h2 className="heading-extra-small">All stories from {name}</h2>
            <section
              className={
                nonFeaturedStories.length < 4 ? "grid-col-2" : "grid-col-4"
              }
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
            </section>
          </section>
        )}
      </main>
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
      stories {
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
`
