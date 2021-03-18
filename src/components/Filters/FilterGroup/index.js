import React from "react"
import PropTypes from "prop-types"

import { Checkbox } from "../.."

export const FilterGroup = ({ name, filters }) => {
  const [optionsShown, setOptionsShown] = React.useState(false)

  return filters && filters && filters.length > 0 ? (
    <div className="filter-group">
      <button
        type="button"
        className={`filter-group-button${optionsShown ? " active" : ""}`}
        onClick={() => setOptionsShown((optionsShown) => !optionsShown)}
      >
        <span>{name}</span>
        <span className="icon-chevron-down"></span>
      </button>
      <ul className={`filter-group-options${optionsShown ? " active" : ""}`}>
        {filters.map((filter, index) => (
          <li className="filter-group-option" key={index}>
            <Checkbox label={filter.name} tabIndex={optionsShown ? 0 : -1} />
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

FilterGroup.propTypes = {
  filters: PropTypes.array.isRequired,
}
