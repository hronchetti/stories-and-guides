import React from "react"
import PropTypes from "prop-types"

export const Button = ({ onClick, children, type, ...props }) => (
  <button onClick={onClick} className="button" type={type} {...props}>
    {children}
  </button>
)

Button.defaultProps = {
  type: "button",
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}
