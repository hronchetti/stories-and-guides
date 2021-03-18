import React from "react"
import PropTypes from "prop-types"

export const Checkbox = ({ label, tabIndex }) => {
  return (
    <label className="checkbox-wrapper">
      <input type="checkbox" tabIndex={tabIndex} />
      <span className="checkbox"></span>
      <span className="checkbox-label">{label}</span>
    </label>
  )
}

Checkbox.defaultProps = {
  tabIndex: 0,
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
}
