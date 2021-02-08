import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

import { ErrorText } from ".."

export const Input = ({ label, name, type, placeholder }) => {
  const [field, meta] = useField(name)

  return (
    <div className={`input${meta.touched && meta.error ? " form-error" : ""}`}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <div className="input-field-wrapper">
        <input
          className="input-field"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          {...field}
        />
        <span className="input-field-selector" />
      </div>
      <ErrorText>{meta.touched ? meta.error : ""}</ErrorText>
    </div>
  )
}

Input.defaultProps = {
  placeholder: "",
  type: "text",
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}
