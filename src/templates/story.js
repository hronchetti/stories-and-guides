import React from "react"
import { graphql } from "gatsby"
import { format, parseISO } from "date-fns"

import { LayoutPhoto, Seo, PhotoCard } from "../components"

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
    <LayoutPhoto photo={coverPhoto.fluid} photoDesc={coverPhoto.title}>
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/stories/${slug}/`}
        image={seo.image.file.url}
      />
      <header className="wrapper-width">
        <h1 className="heading-extra-large">{title}</h1>
        <span>{format(parseISO(createdAt), "dd.MM.y")}</span>
        <p className="heading-small">{introduction.introduction}</p>
      </header>
      <main className="wrapper-width">
        <section className="wrapper-height">
          <h2 className="heading-extra-small">More stories like this</h2>
          <section className="grid-col-2">
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
          </section>
        </section>
      </main>
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
