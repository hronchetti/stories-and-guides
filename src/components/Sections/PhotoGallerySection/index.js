import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

export const PhotoGallerySection = ({ photos }) => {
  const [translateValue, setTranslateValue] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextSlide = () => {
    const nextSlide = document.getElementsByClassName(
      `slide-${currentIndex + 1}`
    )[0]
    console.log(nextSlide.clientWidth)
  }

  const previousSlide = () => {
    const previousSlide = document.getElementsByClassName(
      `slide-${currentIndex - 1}`
    )[0]
    // Get computed style and add margin to client width/offset width
    console.log(previousSlide.clientWidth)
  }

  return (
    <section className="wrapper-height photo-gallery-section">
      <div className="photo-gallery-section-photos">
        <button
          className="photo-gallery-section-button photo-gallery-section-button-left"
          onClick={previousSlide}
        >
          <span className="hidden">Previous photo</span>
          <span className="icon-arrow"></span>
        </button>
        <button
          className="photo-gallery-section-button photo-gallery-section-button-right"
          onClick={nextSlide}
        >
          <span className="hidden">Next photo</span>
          <span className="icon-arrow"></span>
        </button>
        <div className="photo-gallery-section-photos-list">
          {photos.map((photo, index) => (
            <Img
              id={`slide-${index}`}
              key={photo.contentful_id}
              className={`photo-gallery-section-photo slide-${index} `}
              fluid={photo.fluid}
              alt={photo.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

PhotoGallerySection.propTypes = {
  photos: PropTypes.array.isRequired,
}
