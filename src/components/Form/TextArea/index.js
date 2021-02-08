import React from "react"
import PropTypes from "prop-types"
import { useField } from "formik"

import { ErrorText } from ".."

export const TextArea = ({ label, optional, name, rows }) => {
  const [field, meta] = useField(name)

  return (
    <div
      className={`form-element-full-width input${
        meta.touched && meta.error ? " form-error" : ""
      }`}
    >
      <Label name={name} optional={optional}>
        {label}
      </Label>
      <textarea
        className={`input-field${
          meta.touched && meta.error ? " input-error" : ""
        }`}
        rows={rows}
        name={name}
        id={name}
        {...field}
      />
      <ErrorText>{meta.touched ? meta.error : ""}</ErrorText>
    </div>
  )
}

TextArea.defaultProps = {
  optional: false,
  rows: 4,
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  rows: PropTypes.number,
}
