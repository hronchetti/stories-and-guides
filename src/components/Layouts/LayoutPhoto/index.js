import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import { Footer, Nav } from "../.."

export const LayoutPhoto = ({ photo, photoDesc, children }) => (
  <>
    <Nav colour="light" />
    <Img
      className="layout-photo-photo"
      fluid={photo}
      alt={photoDesc}
      title={photoDesc}
    />
    <main className="wrapper-width layout-photo">{children}</main>
    <Footer />
  </>
)

LayoutPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
