import React from "react"
import PropTypes from "prop-types"

export const FilterCheckbox = ({ name, count, selected }) => {
  return <div className="filter"></div>
}

FilterCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
}
