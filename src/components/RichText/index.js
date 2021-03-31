import React from "react"
import PropTypes from "prop-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

export const RichText = ({ content }) => (
  <div className="rich-text">{content && renderRichText(content)}</div>
)

RichText.propTypes = {
  content: PropTypes.object.isRequired,
}
