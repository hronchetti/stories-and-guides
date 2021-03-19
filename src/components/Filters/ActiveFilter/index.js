import React from "react"
import PropTypes from "prop-types"

export const ActiveFilter = ({ name, removeFn }) => (
  <div className="active-filter">
    <span className="active-filter-name">{name}</span>
    <button className="active-filter-button" onClick={removeFn}>
      <span className="icon-close"></span>
      <span className="hidden">Remove Filter</span>
    </button>
  </div>
)

ActiveFilter.propTypes = {
  name: PropTypes.string.isRequired,
  removeFn: PropTypes.func.isRequired,
}
