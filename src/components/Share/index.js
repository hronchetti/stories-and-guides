import React from "react"
import PropTypes from "prop-types"

export const Share = ({ message }) => (
  <section className="share">
    <div className="share-box">
      <h3>{message}</h3>
    </div>
  </section>
)

Share.propTypes = {
  message: PropTypes.string.isRequired,
}
