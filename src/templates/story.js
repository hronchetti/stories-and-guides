import React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"

import {
  AccordionsSection,
  Grid,
  LayoutPhoto,
  PhotoCard,
  PhotoGallerySection,
  PhotosSection,
  QuoteSection,
  Seo,
  SocialSignOff,
  TextSection,
} from "../components"

const Story = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    coverPhoto,
    createdAt,
    introduction,
    relatedStories,
    sections,
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
      wrapper={false}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/stories/${slug}/`}
        image={seo.image && seo.image.file && seo.image.file.url}
      />
      {sections &&
        sections.length > 0 &&
        sections.map((section) =>
          section.__typename === "ContentfulAccordionGroups" ? (
            <section className="wrapper-width" key={section.contentful_id}>
              <AccordionsSection
                heading={section.heading}
                accordions={section.accordions}
              />
            </section>
          ) : section.__typename === "ContentfulStoriesPhotoGalleries" ? (
            <PhotoGallerySection
              photos={section.photos}
              key={section.contentful_id}
            />
          ) : section.__typename === "ContentfulStoriesPhotosSection" ? (
            <section className="wrapper-width" key={section.contentful_id}>
              <PhotosSection
                key={section.contentful_id}
                photos={section.photos}
                wide={section.wide}
              />
            </section>
          ) : section.__typename === "ContentfulStoriesQuoteSections" ? (
            <section className="wrapper-width" key={section.contentful_id}>
              <QuoteSection
                key={section.contentful_id}
                quote={section.quote.quote}
                author={section.author}
              />
            </section>
          ) : section.__typename === "ContentfulStoriesTextSection" ? (
            <section className="wrapper-width" key={section.contentful_id}>
              <TextSection
                key={section.contentful_id}
                heading={section.heading}
                content={section.content.content}
              />
            </section>
          ) : null
        )}
      <section className="wrapper-width">
        <SocialSignOff />
      </section>
      {relatedStories && relatedStories.length > 0 && (
        <section className="wrapper-width">
          <Grid
            itemCount={relatedStories.length}
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
        </section>
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
            contentful_id
            content {
              content
            }
          }
          contentful_id
        }
        ... on ContentfulStoriesPhotoGalleries {
          photos {
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
            title
            contentful_id
          }
          contentful_id
        }
        ... on ContentfulStoriesPhotosSection {
          photos {
            contentful_id
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
            title
          }
          wide
          contentful_id
        }
        ... on ContentfulStoriesQuoteSections {
          author
          quote {
            quote
          }
          contentful_id
        }
        ... on ContentfulStoriesTextSection {
          content {
            content
          }
          heading
          contentful_id
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
