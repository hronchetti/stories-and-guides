import React from "react"
import PropTypes from "prop-types"

import { useOnClickOutside } from "../../../hooks"

export const SortButton = ({ sortOptions, setSortOptions }) => {
  const ref = React.useRef()
  useOnClickOutside(ref, () => {
    console.log("hit")
    return setSortOptions((curOptions) => ({
      ...curOptions,
      visible: false,
    }))
  })

  return (
    <div className="filter-group sort-button" ref={ref}>
      <button
        type="button"
        className={`filter-group-button${sortOptions.visible ? " active" : ""}`}
        onClick={() =>
          setSortOptions((curOptions) => ({
            ...curOptions,
            visible: !curOptions.visible,
          }))
        }
      >
        <span className="sort-button-label">Sort: </span>
        <span>{sortOptions.selected}</span>
        <span className="icon-chevron-down"></span>
      </button>
      {sortOptions.options && sortOptions.options.length > 0 && (
        <ul
          className={`sort-button-options${
            sortOptions.visible ? " active" : ""
          }`}
        >
          {sortOptions.options.map((option) => (
            <li className="sort-button-option" key={option}>
              <button
                type="button"
                className="sort-button-option-button"
                onClick={() =>
                  setSortOptions((curSortOptions) => ({
                    ...curSortOptions,
                    selected: option,
                  }))
                }
                tabIndex={sortOptions.visible ? 0 : -1}
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
  sortOptions: PropTypes.shape({
    selected: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string.isRequired),
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  setSortOptions: PropTypes.func.isRequired,
}
