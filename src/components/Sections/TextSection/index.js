import React from "react"
import ReactMarkdown from "react-markdown"
import PropTypes from "prop-types"

export const TextSection = ({ heading, content }) => (
  <section className="wrapper-height text-section">
    <h2 className="heading-medium text-section-heading">{heading}</h2>
    <ReactMarkdown className="rich-text" source={content} />
  </section>
)

TextSection.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
