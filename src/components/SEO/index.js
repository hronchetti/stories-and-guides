import React from "react"
import { formatISODuration } from "date-fns"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

export const Seo = ({
  article,
  createdAt,
  description,
  image,
  title,
  updatedAt,
  url,
}) => (
  <StaticQuery
    query={graphql`
      query DefaultSEOQuery {
        defaultSeo: contentfulSeo(default: { eq: true }) {
          title
          metaDescription {
            metaDescription
          }
          image {
            file {
              url
            }
          }
        }
      }
    `}
    render={(data) => (
      <Helmet title={title ? title : data.defaultSeo.title}>
        <meta
          name="description"
          content={
            description
              ? description
              : data.defaultSeo.metaDescription.metaDescription
          }
        />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta
          property="og:title"
          content={title ? title : data.defaultSeo.title}
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : data.defaultSeo.metaDescription.metaDescription
          }
        />
        {article && <meta property="og:type" content="article" />}
        {article && createdAt && (
          <meta
            property="article:published_time"
            content={formatISODuration(createdAt)}
          />
        )}
        {article && updatedAt && (
          <meta
            property="article:modified_time"
            content={formatISODuration(updatedAt)}
          />
        )}
        {image && <meta property="og:image" content={image} />}
        <meta property="og:site_name" content="Stories and Guides" />
        <meta
          name="twitter:title"
          content={title ? title : data.defaultSeo.title}
        />
        <meta name="twitter:site" content="https://storiesandguides.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={
            description
              ? description
              : data.defaultSeo.metaDescription.metaDescription
          }
        />
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>
    )}
  />
)

Seo.defaultProps = {
  article: false,
  createdAt: "",
  description: "",
  image: "",
  title: "",
  updatedAt: "",
}

Seo.propTypes = {
  article: PropTypes.bool,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
  url: PropTypes.string.isRequired,
}
