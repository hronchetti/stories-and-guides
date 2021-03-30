import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import { ButtonLinkWithArrow, Footer, Nav } from "../.."
import { WorldMap } from "./WorldMap"

export const LayoutHomepage = ({
  heading,
  introduction,
  photo,
  photoDesc,
  children,
}) => (
  <>
    <Nav colour="light" />
    <Img className="layout-photo-photo" fluid={photo} alt={photoDesc} />
    <header className="wrapper-width header layout-photo-header layout-homepage-header">
      <div className="layout-homepage-header-illustration">
        <WorldMap />
      </div>
      <div className="layout-homepage-header-content">
        <h1 className="heading-medium">{heading}</h1>
        <p>{introduction}</p>
        <div className="layout-homepage-header-content-link">
          <ButtonLinkWithArrow to="/destinations/">
            All destinations
          </ButtonLinkWithArrow>
        </div>
      </div>
    </header>
    <main className="wrapper-width">{children}</main>
    <Footer />
  </>
)

LayoutHomepage.propTypes = {
  heading: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
