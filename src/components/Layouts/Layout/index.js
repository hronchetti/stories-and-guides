import React from "react"
import PropTypes from "prop-types"

import { Footer, Nav } from "../.."

export const Layout = ({ heading, children }) => (
  <>
    <Nav />
    <header className="wrapper-width">
      <h1>{heading}</h1>
    </header>
    <main className="wrapper-width">{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  heading: PropTypes.string.isRequired,
}
