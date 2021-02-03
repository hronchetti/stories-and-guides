import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { format, parseISO } from "date-fns"

export const PhotoCard = ({ photo, photoDesc, date, title, to }) => (
  <Link className="grid-item photo-card" to={to}>
    <Img
      className="photo-card-photo"
      fluid={photo}
      title={photoDesc}
      alt={photoDesc}
    />
    <h3 className="heading-medium photo-card-title">{title}</h3>
    {date && (
      <div className="photo-card-posted">
        <span className="photo-card-posted-text">posted</span>
        <span className="photo-card-posted-date">
          {format(parseISO(date), "dd.MM.y")}
        </span>
      </div>
    )}
  </Link>
)

PhotoCard.defaultProps = {
  date: null,
}

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired,
  photoDesc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  to: PropTypes.string.isRequired,
}
