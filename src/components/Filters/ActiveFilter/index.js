import React from "react"
import PropTypes from "prop-types"

export const ActiveFilter = ({ name, prefix, removeFn }) => (
  <div className="active-filter">
    <span className="active-filter-name">
      {prefix !== "" ? (
        <span className="active-filter-name-prefix">{prefix}: </span>
      ) : (
        ""
      )}
      {name}
    </span>
    <button className="active-filter-button" onClick={removeFn}>
      <span className="icon-close"></span>
      <span className="hidden">Remove Filter</span>
    </button>
  </div>
)

ActiveFilter.defaultProps = {
  prefix: "",
}

ActiveFilter.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  removeFn: PropTypes.func.isRequired,
}
