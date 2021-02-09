import React from "react"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import PropTypes from "prop-types"

export const Contributor = ({
  heading,
  content,
  photo,
  photoDesc,
  linkedInUrl,
  instagramUrl,
  twitterUrl,
  facebookUrl,
}) => (
  <section className="wrapper-height contributor">
    <div className="contributor-body">
      <h2 className="heading-medium contributor-body-heading">{heading}</h2>
      <ReactMarkdown className="rich-text" source={content} />
      <div className="contributor-body-social-links">
        {instagramUrl && (
          <a
            href={instagramUrl}
            aria-label="Instagram Account"
            target="_blank"
            rel="noopener"
          >
            <span className="hidden">Instagram Account</span>
            <span className="icon-instagram" />
          </a>
        )}
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            aria-label="LinkedIn Account"
            target="_blank"
            rel="noopener"
          >
            <span className="hidden">LinkedIn Account</span>
            <span className="icon-linked-in" />
          </a>
        )}
        {twitterUrl && (
          <a
            href={twitterUrl}
            aria-label="Twitter Account"
            target="_blank"
            rel="noopener"
          >
            <span className="hidden">Twitter Account</span>
            <span className="icon-twitter" />
          </a>
        )}
        {facebookUrl && (
          <a
            href={facebookUrl}
            aria-label="Facebook Account"
            target="_blank"
            rel="noopener"
          >
            <span className="hidden">Facebook Account</span>
            <span className="icon-facebook" />
          </a>
        )}
      </div>
    </div>
    <Img className="contributor-photo" fluid={photo} alt={photoDesc} />
  </section>
)

Contributor.defaultProps = {
  linkedInUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  facebookUrl: "",
}

Contributor.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  linkedInUrl: PropTypes.string,
  instagramUrl: PropTypes.string,
}
