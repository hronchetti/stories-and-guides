import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Logo from "../../images/stories-and-guides-logo.svg"

export const Nav = ({ colour }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false)

  return (
    <nav className={`nav nav-${colour}`}>
      <section className="wrapper-width">
        <div className="nav-header">
          <Link to="/" className="nav-header-logo">
            <Logo />
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
