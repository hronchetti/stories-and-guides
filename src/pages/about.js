import React from "react"
import { graphql } from "gatsby"

import { LayoutPhoto, Seo, Grid, PhotoCard } from "../components"

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
      }
      sections {
        content {
          raw
        }
        heading
        contentful_id
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
  }
`
