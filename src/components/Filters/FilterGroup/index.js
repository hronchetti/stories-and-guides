import React from "react"
import PropTypes from "prop-types"

import { Checkbox } from "../.."
import { useOnClickOutside } from "../../../hooks"

export const FilterGroup = ({ name, filters, setFilters }) => {
  const [optionsShown, setOptionsShown] = React.useState(false)
  const ref = React.useRef()
  useOnClickOutside(ref, () => setOptionsShown(false))

  const updateFilters = (event) => {
    const changedFilter = event.target.name
    if (
      filters.selected.some(
        (selectedFilter) => selectedFilter === changedFilter
      )
    ) {
      setFilters((curFilters) => ({
        ...curFilters,
        selected: [
          ...curFilters.selected.filter(
            (selectedFilter) => selectedFilter !== changedFilter
          ),
        ],
      }))
    } else {
      setFilters((curFilters) => ({
        ...curFilters,
        selected: [...curFilters.selected, changedFilter],
      }))
    }

    setTimeout(() => {
      setOptionsShown(false)
    }, 300)
  }

  return filters.all.length > 0 ? (
    <div className="filter-group" ref={ref}>
      <button
        type="button"
        className={`filter-group-button${optionsShown ? " active" : ""}${
          filters.selected.length > 0 ? " filtered" : ""
        }`}
        onClick={() => setOptionsShown((optionsShown) => !optionsShown)}
      >
        <span>{name}</span>
        <span className="icon-chevron-down"></span>
      </button>
      <ul className={`filter-group-options${optionsShown ? " active" : ""}`}>
        {filters.all.map((filter, index) => (
          <li className="filter-group-option" key={index}>
            <Checkbox
              checked={filters.selected.some(
                (selectedFilter) => selectedFilter === filter
              )}
              name={filter}
              label={filter}
              tabIndex={optionsShown ? 0 : -1}
              onChange={updateFilters}
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
  setFilters: PropTypes.func.isRequired,
}
