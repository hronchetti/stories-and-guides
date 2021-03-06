import React from "react"
import PropTypes from "prop-types"

import { Footer, Nav } from "../.."

export const Layout = ({ heading, children }) => (
  <>
    <Nav />
    <header className="wrapper-width header">
      <div className="header-inner">
        <h1 className="heading-extra-large">{heading}</h1>
      </div>
    </header>
    <main className="wrapper-width">{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  heading: PropTypes.string.isRequired,
}
