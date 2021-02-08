import React from "react"
import PropTypes from "prop-types"
import TrackVisibility from "react-on-screen"

import { Footer, Nav } from "../.."

export const Layout = ({ heading, children }) => (
  <>
    <Nav />
    <TrackVisibility
      tag="header"
      className="wrapper-width header"
      partialVisibility
      once
    >
      {({ isVisible }) => (
        <div className={isVisible ? "header-inner active" : "header-inner"}>
          <h1 className="heading-extra-large">{heading}</h1>
        </div>
      )}
    </TrackVisibility>
    <main className="wrapper-width">{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  heading: PropTypes.string.isRequired,
}
