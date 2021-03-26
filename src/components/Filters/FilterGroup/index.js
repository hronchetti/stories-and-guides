import React from "react"
import PropTypes from "prop-types"

import { Checkbox } from "../.."
import { useOnClickOutside } from "../../../hooks"

export const FilterGroup = ({ name, filters, updateResults, setFilters }) => {
  const ref = React.useRef()
  useOnClickOutside(ref, () =>
    setFilters((filters) => ({ ...filters, visible: false }))
  )

  return filters.all.length > 0 ? (
    <div className="filter-group" ref={ref}>
      <button
        type="button"
        className={`filter-group-button${filters.visible ? " active" : ""}${
          filters.selected.length > 0 ? " filtered" : ""
        }`}
        onClick={() =>
          setFilters((filters) => ({
            ...filters,
            visible: !filters.visible,
          }))
        }
      >
        <span>{name}</span>
        <span className="icon-chevron-down"></span>
      </button>
      <ul className={`filter-group-options${filters.visible ? " active" : ""}`}>
        {filters.all.map((filter, index) => (
          <li className="filter-group-option" key={index}>
            <Checkbox
              checked={filters.selected.some(
                (selectedFilter) => selectedFilter === filter
              )}
              name={filter}
              label={filter}
              tabIndex={filters.visible ? 0 : -1}
              onChange={updateResults}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

FilterGroup.propTypes = {
  name: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  updateResults: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
}
