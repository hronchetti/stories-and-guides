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
    const nextSlideWidth = nextSlide.clientWidth
    const nextSlideMarginRight = parseInt(
      window
        .getComputedStyle(nextSlide)
        .getPropertyValue("margin-right")
        .split("px")[0]
    )

    setTranslateValue(
      (current) => current - nextSlideWidth - nextSlideMarginRight
    )
    setCurrentIndex((current) => current + 1)
  }

  const previousSlide = () => {
    const previousSlide = document.getElementsByClassName(
      `slide-${currentIndex - 1}`
    )[0]
    const previousSlideWidth = previousSlide.clientWidth
    const previousSlideMarginRight = parseInt(
      window
        .getComputedStyle(previousSlide)
        .getPropertyValue("margin-right")
        .split("px")[0]
    )

    setTranslateValue(
      (current) => current + previousSlideWidth + previousSlideMarginRight
    )
    setCurrentIndex((current) => current - 1)
  }

  return (
    <section className="wrapper-height photo-gallery-section">
      <div className="photo-gallery-section-photos">
        {currentIndex !== 0 && (
          <button
            className="photo-gallery-section-button photo-gallery-section-button-left"
            onClick={previousSlide}
          >
            <span className="hidden">Previous photo</span>
            <span className="icon-arrow"></span>
          </button>
        )}
        {currentIndex !== photos.length - 1 && (
          <button
            className="photo-gallery-section-button photo-gallery-section-button-right"
            onClick={nextSlide}
          >
            <span className="hidden">Next photo</span>
            <span className="icon-arrow"></span>
          </button>
        )}
        <div
          className="photo-gallery-section-photos-list"
          style={{
            transform: `translateX(${translateValue}px)`,
          }}
        >
          {photos.map((photo, index) => (
            <Img
              id={`slide-${index}`}
              key={photo.contentful_id}
              className={`photo-gallery-section-photo slide-${index}`}
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
