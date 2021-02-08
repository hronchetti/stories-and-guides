import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import TrackVisibility from "react-on-screen"

import { Footer, Nav } from "../.."

export const LayoutPhoto = ({
  heading,
  introduction,
  photo,
  photoDesc,
  children,
  date,
}) => (
  <>
    <Nav colour="light" />
    <Img
      className="layout-photo-photo"
      fluid={photo}
      alt={photoDesc}
      title={photoDesc}
    />
    <TrackVisibility
      tag="header"
      className="wrapper-width header layout-photo-header"
      partialVisibility
      once
    >
      {({ isVisible }) => (
        <div className={isVisible ? "header-inner active" : "header-inner"}>
          <h1 className="heading-extra-large">{heading}</h1>
          {date && <span>{date}</span>}
          <p className="heading-small">{introduction}</p>
        </div>
      )}
    </TrackVisibility>
    <main className="wrapper-width layout-photo">{children}</main>
    <Footer />
  </>
)

LayoutPhoto.defaultProps = {
  date: "",
}

LayoutPhoto.propTypes = {
  heading: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
