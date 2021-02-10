import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import TrackVisibility from "react-on-screen"

export const PhotosSection = ({ photos, wide }) => {
  if (photos && photos.length > 0) {
    return (
      <section
        className={`wrapper-height photos-section${
          !wide ? " photos-section-thin" : ""
        }${photos.length > 1 ? " photos-section-col-2" : ""}
        `}
      >
        {photos.map((photo) => (
          <TrackVisibility partialVisibility once key={photo.contentful_id}>
            {({ isVisible }) => (
              <Img
                className={`photos-section-photo ${isVisible ? " active" : ""}`}
                fluid={photo.fluid}
                alt={photo.title}
              />
            )}
          </TrackVisibility>
        ))}
      </section>
    )
  } else {
    return null
  }
}

PhotosSection.propTypes = {
  photos: PropTypes.array.isRequired,
  wide: PropTypes.bool.isRequired,
}
