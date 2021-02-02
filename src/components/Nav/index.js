import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Logo from "../../images/stories-and-guides-logo.svg"

export const Nav = ({ colour }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false)

  return (
    <nav className={`nav nav-${colour}`}>
      <section className="wrapper-width">
        <Logo />
        <ul>
          <li>
            <Link to="/guides/">Guides</Link>
          </li>
          <li>
            <Link to="/destinations/">Destinations</Link>
          </li>
          <li>
            <Link to="/stories/">Stories</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
        <button
          className="nav-mobile-menu"
          aria-label={mobileMenuVisible ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuVisible((current) => !current)}
        ></button>
      </section>
      <section className="nav-mobile-menu-overlay"></section>
    </nav>
  )
}

Nav.defaultProps = {
  colour: "dark",
}

Nav.propTypes = {
  colour: PropTypes.oneOf(["dark", "light"]),
}
