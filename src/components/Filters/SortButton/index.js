import React from "react"
import PropTypes from "prop-types"

export const SortButton = ({ options }) => {
  const [optionsShown, setOptionsShown] = React.useState(false)

  return (
    <div className="filter-group sort-button">
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
              <button className="sort-button-option-button">{option}</button>
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
}
