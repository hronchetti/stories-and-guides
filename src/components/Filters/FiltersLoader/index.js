import React from "react"
import PropTypes from "prop-types"

export const FiltersLoader = ({ loading, children }) =>
  loading ? (
    <div className="filters-loader">
      <span className="filters-loader-spinner" />
    </div>
  ) : (
    children
  )

FiltersLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
