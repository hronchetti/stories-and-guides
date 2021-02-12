import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

export const QuoteSection = ({ quote, author }) => (
  <section className="wrapper-height">
    <div className="quote-section">
      <blockquote>
        <ReactMarkdown className="quote-section-quote" children={quote} />
      </blockquote>
      <span className="quote-section-author">- {author}</span>
    </div>
  </section>
)

QuoteSection.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
