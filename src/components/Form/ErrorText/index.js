import React from "react"
import PropTypes from "prop-types"

export const ErrorText = ({ children }) => (
  <span className="form-error-text">{children}</span>
)

ErrorText.defaultProps = {
  children: "",
}

ErrorText.propTypes = {
  children: PropTypes.string,
}
