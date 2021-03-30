import React from "react"
import PropTypes from "prop-types"

import { FilterGroup, SortButton, ActiveFilter } from ".."
import { removeSelectedFilter } from "../../../utilities"

export const FilterSystem = ({
  filters,
  setFilters,
  setSortOptions,
  sortOptions,
  updateResults,
}) => (
  <>
    <section className="filter-system">
      <div>
        <FilterGroup
          filters={filters}
          setFilters={setFilters}
          updateResults={updateResults}
        />
      </div>
      <div>
        <SortButton sortOptions={sortOptions} setSortOptions={setSortOptions} />
      </div>
    </section>
    {filters.selected.length > 0 && (
      <section className="active-filters">
        {filters.selected.map((selectedFilter) => (
          <ActiveFilter
            key={selectedFilter}
            name={selectedFilter}
            removeFn={() => removeSelectedFilter(selectedFilter, setFilters)}
          />
        ))}
      </section>
    )}
  </>
)

FilterSystem.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setSortOptions: PropTypes.func.isRequired,
  sortOptions: PropTypes.object.isRequired,
  updateResults: PropTypes.func.isRequired,
}
