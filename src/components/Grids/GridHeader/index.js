import React from "react"
import PropTypes from "prop-types"

import { ButtonLinkWithArrow } from "../.."

export const GridHeader = ({ heading, linkText, linkTo }) => (
  <div className="grid-header">
    <h2 className="heading-extra-small grid-header-heading">{heading}</h2>
    {linkText && linkTo && (
      <ButtonLinkWithArrow to={linkTo}>{linkText}</ButtonLinkWithArrow>
    )}
  </div>
)

GridHeader.defaultProps = {
  linkText: "",
  linkTo: "",
}

GridHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
}
