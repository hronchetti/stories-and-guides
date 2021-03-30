import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

export const InstagramFeed = ({ posts }) => {
  if (posts && posts.length > 0) {
    return (
      <section
        className={`wrapper-height instagram-feed${
          posts.length < 6 ? " instagram-feed-small" : ""
        }`}
      >
        {posts.map(({ node }) => (
          <a
            href="https://www.instagram.com/rolfeewan/"
            target="_blank"
            rel="noopener"
            key={node.id}
            className="instragram-feed-post"
          >
            <Img fluid={node.localFile.childImageSharp.fluid} />
          </a>
        ))}
      </section>
    )
  }
}

InstagramFeed.propTypes = {
  posts: PropTypes.array.isRequired,
}
