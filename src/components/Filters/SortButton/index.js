import React from "react"
import PropTypes from "prop-types"

import { useOnClickOutside } from "../../../hooks"

export const SortButton = ({ options, setSortOptions }) => {
  const [optionsShown, setOptionsShown] = React.useState(false)
  const ref = React.useRef()
  useOnClickOutside(ref, () => setOptionsShown(false))

  const updateSortOptions = (option) => {
    setSortOptions((existingSortOptions) => ({
      ...existingSortOptions,
      selected: option,
    }))

    setTimeout(() => {
      setOptionsShown(false)
    }, 300)
  }

  return (
    <div className="filter-group sort-button" ref={ref}>
      <button
        type="button"
        className={`filter-group-button${optionsShown ? " active" : ""}`}
        onClick={() => setOptionsShown((optionsShown) => !optionsShown)}
      >
        <span className="sort-button-label">Sort: </span>
        <span>{options.selected}</span>
        <span className="icon-chevron-down"></span>
      </button>
      {options.options && options.options.length > 0 && (
        <ul className={`sort-button-options${optionsShown ? " active" : ""}`}>
          {options.options.map((option) => (
            <li className="sort-button-option" key={option}>
              <button
                type="button"
                className="sort-button-option-button"
                onClick={() => updateSortOptions(option)}
                tabIndex={optionsShown ? 0 : -1}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

SortButton.propTypes = {
  options: PropTypes.shape({
    selected: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  setSortOptions: PropTypes.func.isRequired,
}
