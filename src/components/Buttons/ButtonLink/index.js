import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="button">
    {children}
  </Link>
)

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
