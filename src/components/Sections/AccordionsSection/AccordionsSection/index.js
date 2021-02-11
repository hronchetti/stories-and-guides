import React from "react"
import PropTypes from "prop-types"

import { Accordion } from ".."

export const AccordionsSection = ({ heading, accordions }) => {
  if (accordions && accordions.length > 0) {
    return (
      <section className="wrapper-height">
        <div className="accordions-section">
          <h2 className="heading-medium">{heading}</h2>
          <div className="accordions-section-accordions">
            {accordions.map((accordion) => (
              <Accordion
                key={accordion.contentful_id}
                name={accordion.name}
                content={accordion.content.content}
              />
            ))}
          </div>
        </div>
      </section>
    )
  } else {
    return null
  }
}

AccordionsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  accordions: PropTypes.arrayOf(
    PropTypes.shape({
      contentful_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
    })
  ).isRequired,
}
