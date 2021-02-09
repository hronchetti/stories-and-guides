import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

import { ErrorText } from ".."

export const TextArea = ({ label, name, rows, placeholder }) => {
  const [field, meta] = useField(name)

  return (
    <div className={`input${meta.touched && meta.error ? " form-error" : ""}`}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <div className="input-field-wrapper">
        <textarea
          className={`input-field${
            meta.touched && meta.error ? " input-error" : ""
          }`}
          placeholder={placeholder}
          rows={rows}
          name={name}
          id={name}
          {...field}
        />
        <span className="input-field-selector" />
      </div>
      <ErrorText>{meta.touched ? meta.error : ""}</ErrorText>
    </div>
  )
}

TextArea.defaultProps = {
  rows: 4,
  placeholder: "",
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
}
