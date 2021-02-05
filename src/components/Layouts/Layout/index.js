import React from "react"
import PropTypes from "prop-types"

import { Footer, Nav } from "../.."

export const Layout = ({ heading, children }) => (
  <>
    <Nav />
    <header className="wrapper-width header">
      <h1 className="heading-extra-large">{heading}</h1>
    </header>
    <main className="wrapper-width">{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  heading: PropTypes.string.isRequired,
}
