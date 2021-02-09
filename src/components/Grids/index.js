import React from "react"
import PropTypes from "prop-types"

import { GridHeader } from "./GridHeader"
export { GridHeader } from "./GridHeader"

export const Grid = ({ itemCount, heading, linkText, linkTo, children }) => (
  <section className="wrapper-height">
    <GridHeader heading={heading} linkText={linkText} linkTo={linkTo} />
    <section className={itemCount > 2 ? "grid-col-4" : "grid-col-2"}>
      {children}
    </section>
  </section>
)

Grid.defaultProps = {
  linkText: "",
  linkTo: "",
}

Grid.propTypes = {
  itemCount: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
  children: PropTypes.node.isRequired,
}
