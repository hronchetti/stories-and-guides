import React from "react"
import PropTypes from "prop-types"

export const FiltersLoader = ({ loading }) => (
  <div className={`filters-loader${loading ? " active" : ""}`}>
    <span className="filters-loader-spinner" />
  </div>
)

FiltersLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
}
