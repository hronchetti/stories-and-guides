import React from "react"
import PropTypes from "prop-types"

import { FilterGroup, SortButton } from ".."

export const FilterSystem = ({ filters, sortOptions }) => {
  return (
    <section className="filter-system">
      <div className="filter-system-left">
        <FilterGroup name="Destinations" filters={filters} />
      </div>
      <div className="filter-system-right">
        <SortButton options={sortOptions} />
      </div>
    </section>
  )
}

FilterSystem.propTypes = {
  filters: PropTypes.array.isRequired,
  sortOptions: PropTypes.object.isRequired,
}
