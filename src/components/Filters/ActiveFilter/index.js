import React from "react"
import PropTypes from "prop-types"

export const ActiveFilter = ({ name, removeFn }) => {
  return <div></div>
}

ActiveFilter.propTypes = {
  name: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
}
