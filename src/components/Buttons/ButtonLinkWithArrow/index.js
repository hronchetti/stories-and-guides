import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export const ButtonLinkWithArrow = ({ to, children }) => (
  <Link to={to} className="button-link-with-arrow">
    {children}
  </Link>
)

ButtonLinkWithArrow.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
