import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import LogoSmall from "../../images/stories-and-guides-logo-small.svg"
import LogoLarge from "../../images/stories-and-guides-logo-large.svg"

export const Nav = ({ colour }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false)
  const [
    scrollOverViewportHeight,
    setScrollOverViewportHeight,
  ] = React.useState(false)

  React.useEffect(() => {
    if (window) {
      window.onscroll = () => {
        if (window.pageYOffset > window.innerHeight) {
          setScrollOverViewportHeight(true)
        } else {
          setScrollOverViewportHeight(false)
        }
      }
    }
  })

  return (
    <nav
      className={`nav nav-${scrollOverViewportHeight ? "dark" : colour}${
        mobileMenuVisible ? " active" : ""
      }`}
    >
      <section className="wrapper-width nav-wrapper">
        <div className="nav-header">
          <Link to="/" className="nav-header-logo">
            <div className="nav-header-logo-small">
              <LogoSmall />
            </div>
            <div className="nav-header-logo-large">
              <LogoLarge />
            </div>
            <span className="hidden">Homepage</span>
          </Link>
          <button
            className={`nav-header-menu-button${
              mobileMenuVisible ? " active" : ""
            }`}
            aria-label={mobileMenuVisible ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuVisible((current) => !current)}
          >
            <span className="nav-header-menu-button-line" />
            <span className="nav-header-menu-button-line" />
            <span className="nav-header-menu-button-line" />
          </button>
        </div>
        <ul className={`nav-main${mobileMenuVisible ? " active" : ""}`}>
          <li className="nav-link">
            <Link to="/guides/" activeClassName="active">
              Guides
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/destinations/" activeClassName="active">
              Destinations
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/stories/" activeClassName="active">
              Stories
            </Link>
          </li>
        </ul>
        <ul className={`nav-secondary${mobileMenuVisible ? " active" : ""}`}>
          <li className="nav-link">
            <Link to="/about/" activeClassName="active">
              About
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/contact/" activeClassName="active">
              Contact
            </Link>
          </li>
        </ul>
      </section>
      <section
        className={`nav-mobile-menu-overlay${
          mobileMenuVisible ? " active" : ""
        }`}
      ></section>
    </nav>
  )
}

Nav.defaultProps = {
  colour: "dark",
}

Nav.propTypes = {
  colour: PropTypes.oneOf(["dark", "light"]),
}
