import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

export const Accordion = ({ name, content }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const accordionElement = React.useRef(null)

  const toggleAccordion = () => {
    const accordionBody = accordionElement.current
    const accordionBodyHeight = accordionBody.scrollHeight

    if (accordionBody.style.maxHeight) {
      accordionBody.style.maxHeight = null
      setIsOpen(false)
    } else {
      accordionBody.style.maxHeight = accordionBodyHeight + "px"
      setIsOpen(true)
    }
  }

  return (
    <div className="accordion">
      <button
        className={`accordion-header${isOpen ? " active" : ""}`}
        onClick={() => toggleAccordion()}
      >
        <h3 className="heading-extra-small accordion-header-title">{name}</h3>
      </button>
      <div className="accordion-body" ref={accordionElement}>
        <ReactMarkdown
          className="accordion-body-content rich-text"
          source={content}
        />
      </div>
    </div>
  )
}

Accordion.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
