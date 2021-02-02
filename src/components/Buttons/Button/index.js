import React from "react"
import PropTypes from "prop-types"

export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="button">
    {children}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
