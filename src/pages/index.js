import * as React from "react"
import { graphql, Link } from "gatsby"

import { LayoutPhoto, Seo, PhotoCard, Grid } from "../components"

const IndexPage = ({ data }) => {
  console.log(data)
  const { siteUrl } = data.site.siteMetadata
  const {
    heading,
    coverPhoto,
    introduction,
    contactSectionHeading,
    contactSectionButtonText,
    topGuides,
    topDestinations,
    seo,
  } = data.homepage
  const latestStories = data.latestStories.edges
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
        url={siteUrl}
        image={seo.image.file.url}
      />
      {latestStories && latestStories.length > 0 && (
        <Grid
          itemCount={latestStories.length}
          heading="Latest from the blog"
          linkText="All stories"
          linkTo="/stories/"
        >
          {latestStories.map(({ node }) => (
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
      {topGuides && topGuides.length > 0 && (
        <Grid
          itemCount={topGuides.length}
          heading="Guides"
          linkText="All guides"
          linkTo="/guides/"
        >
          {topGuides.map((guide) => (
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
      {topDestinations && topDestinations.length > 0 && (
        <Grid
          itemCount={topDestinations.length}
          heading="Destinations"
          linkText="All destinations"
          linkTo="/destinations/"
        >
          {topDestinations.map((destination) => (
            <PhotoCard
              key={destination.contentful_id}
              title={destination.name}
              photo={destination.coverPhoto.fluid}
              photoDesc={destination.coverPhoto.title}
              to={`/destinations/${destination.slug}/`}
            />
          ))}
        </Grid>
      )}
      <section className="wrapper-height contact-us-section">
        <h2 className="heading-large contact-us-section-heading">
          {contactSectionHeading}
        </h2>
        <div className="contact-us-section-button">
          <Link to="/contact/" className="button">
            {contactSectionButtonText}
          </Link>
        </div>
      </section>
    </LayoutPhoto>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query getHomepage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    homepage: contentfulHomePage {
      heading
      coverPhoto {
        fluid(maxWidth: 2100) {
          ...GatsbyContentfulFluid
        }
        title
      }
      contactSectionHeading
      contactSectionButtonText
      introduction {
        introduction
      }
      topGuides {
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
      topDestinations {
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
    latestStories: allContentfulStories(
      sort: { order: ASC, fields: createdAt }
      limit: 2
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
