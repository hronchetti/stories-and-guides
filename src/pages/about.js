import React from "react"
import { graphql } from "gatsby"

import {
  Contributor,
  Grid,
  InstagramFeed,
  LayoutPhoto,
  PhotoCard,
  PhotosSection,
  Seo,
  SocialSignOff,
  TextSection,
} from "../components"

const About = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const {
    heading,
    coverPhoto,
    seo,
    introduction,
    contributor,
    sections,
  } = data.aboutPage

  const instaPosts = data.instagramPosts.edges
  const contactPagePhoto = data.contactPage.contactFormPhoto
  const latestStory = data.story.edges[0].node
  const firstDestination = data.destination.edges[0].node
  const firstGuide = data.guide.edges[0].node

  return (
    <LayoutPhoto
      heading={heading}
      introduction={introduction.introduction}
      photo={coverPhoto.fluid}
      photoDesc={coverPhoto.title}
    >
      <Seo
        title={seo.title}
        description={seo.metaDescription.metaDescription}
        url={siteUrl + `/about/`}
        image={seo.image.file.url}
      />
      <Grid itemCount={4} heading="Navigating the blog">
        <PhotoCard
          title="Guides"
          photo={firstGuide.coverPhoto.fluid}
          photoDesc={firstGuide.coverPhoto.title}
          to={`/guides/`}
        />
        <PhotoCard
          title="Destinations"
          photo={firstDestination.coverPhoto.fluid}
          photoDesc={firstDestination.coverPhoto.title}
          to={`/destinations/`}
        />
        <PhotoCard
          title="Stories"
          photo={latestStory.coverPhoto.fluid}
          photoDesc={latestStory.coverPhoto.title}
          to={`/stories/`}
        />
        <PhotoCard
          title="Contact"
          photo={contactPagePhoto.fluid}
          photoDesc={contactPagePhoto.title}
          to={`/contact/`}
        />
      </Grid>
      {contributor &&
        contributor.length > 0 &&
        contributor.map((contributor) => (
          <Contributor
            key={contributor.contentful_id}
            heading={contributor.heading}
            content={contributor.content.content}
            photo={contributor.photo.fluid}
            photoDesc={contributor.photo.title}
            linkedInUrl={contributor.linkedInUrl}
            instagramUrl={contributor.instagramUrl}
          />
        ))}
      {sections &&
        sections.length > 0 &&
        sections.map((section, index) => {
          if (index === 2) {
            return (
              <React.Fragment key={section.contentful_id}>
                {section.__typename === "ContentfulStoriesTextSection" ? (
                  <TextSection
                    heading={section.heading}
                    content={section.content.content}
                  />
                ) : section.__typename === "ContentfulStoriesPhotosSection" ? (
                  <PhotosSection photos={section.photos} wide={section.wide} />
                ) : null}
                <InstagramFeed posts={instaPosts} />
              </React.Fragment>
            )
          } else {
            return section.__typename === "ContentfulStoriesTextSection" ? (
              <TextSection
                key={section.contentful_id}
                heading={section.heading}
                content={section.content.content}
              />
            ) : section.__typename === "ContentfulStoriesPhotosSection" ? (
              <PhotosSection
                key={section.contentful_id}
                photos={section.photos}
                wide={section.wide}
              />
            ) : null
          }
        })}
      <SocialSignOff />
    </LayoutPhoto>
  )
}

export default About

export const pageQuery = graphql`
  query getAboutPage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    aboutPage: contentfulAboutPage {
      heading
      coverPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      introduction {
        introduction
      }
      contributor {
        content {
          content
        }
        heading
        contentful_id
        photo {
          fluid(maxWidth: 2100) {
            ...GatsbyContentfulFluid
          }
          title
        }
        linkedInUrl
        instagramUrl
      }
      sections {
        ... on ContentfulStoriesPhotosSection {
          contentful_id
          photos {
            contentful_id
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
            title
          }
          wide
        }
        ... on ContentfulStoriesTextSection {
          content {
            content
          }
          heading
          contentful_id
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
    }
    contactPage: contentfulContactPage {
      contactFormPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
    }
    story: allContentfulStories(
      sort: { order: ASC, fields: createdAt }
      limit: 1
    ) {
      edges {
        node {
          coverPhoto {
            title
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    destination: allContentfulDestinations(
      sort: { order: ASC, fields: name }
      limit: 1
    ) {
      edges {
        node {
          coverPhoto {
            title
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    guide: allContentfulGuides(sort: { order: ASC, fields: name }, limit: 1) {
      edges {
        node {
          coverPhoto {
            title
            fluid(maxWidth: 2100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    instagramPosts: allInstaNode(
      limit: 6
      sort: { order: DESC, fields: timestamp }
    ) {
      edges {
        node {
          id
          preview
          localFile {
            childImageSharp {
              fluid(maxWidth: 800, maxHeight: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

/* 

     */
