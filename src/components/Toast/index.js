import React from "react"
import PropTypes from "prop-types"

export const Toast = ({ dismissFunc, type, message, isVisible }) => (
  <div
    className={`toast ${type ? "toast-success" : "toast-error"}${
      isVisible ? " active" : ""
    }`}
  >
    <div className="toast-body">
      <span
        className={`toast-body-icon ${type ? "icon-tick" : "icon-close"}`}
      />
      <span
        className="toast-body-content"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
    <button
      className="toast-dismiss-button"
      onClick={dismissFunc}
      aria-label="Dismiss message"
    >
      <span className="hidden">Close</span>
      <span className="icon-close" />
    </button>
  </div>
)

Toast.propTypes = {
  dismissFunc: PropTypes.func,
  type: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
}
