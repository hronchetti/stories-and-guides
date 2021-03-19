import React from "react"
import PropTypes from "prop-types"

export const Checkbox = ({ checked, name, label, tabIndex, onChange }) => (
  <label className="checkbox-wrapper">
    <input
      name={name}
      type="checkbox"
      tabIndex={tabIndex}
      onChange={onChange}
      checked={checked}
    />
    <span className="checkbox"></span>
    <span className="checkbox-label">{label}</span>
  </label>
)

Checkbox.defaultProps = {
  tabIndex: 0,
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
}
