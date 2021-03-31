import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import { Footer, Nav } from "../.."

export const LayoutPhoto = ({
  children,
  date,
  heading,
  introduction,
  photo,
  photoDesc,
  wrapper,
}) => (
  <>
    <Nav colour="light" />
    <Img className="layout-photo-photo" fluid={photo} alt={photoDesc} />
    <header className="wrapper-width header layout-photo-header">
      <div className="layout-photo">
        <h1 className="heading-extra-large">{heading}</h1>
        {date && <span className="layout-photo-date">{date}</span>}
        <p className="heading-small layout-photo-introduction">
          {introduction}
        </p>
      </div>
    </header>
    <main className={wrapper ? "wrapper-width" : ""}>{children}</main>
    <Footer />
  </>
)

LayoutPhoto.defaultProps = {
  date: "",
  wrapper: true,
}

LayoutPhoto.propTypes = {
  heading: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  wrapper: PropTypes.bool,
}
