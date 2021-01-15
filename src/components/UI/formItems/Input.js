import React from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const Input = (props) => {
  const { type, name, children, label, ...rest } = props;

  let fieldInput = <Field type={type} name={name} className='form-control' {...rest} />;

  if (type === "select") {
    fieldInput = (
      <Field as='select' className='form-control' name={name}>
        {children}
      </Field>
    );
  }

  return (
    <div className='form-group'>
      <label>{label}</label>
      {fieldInput}
      <ErrorMessage name={name}>
        {(message) => (
          <span className='error-msg'>
            <i className='fa fa-warning'></i> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
