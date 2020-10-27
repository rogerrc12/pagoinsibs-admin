import React from "react";
import { Field, ErrorMessage } from "formik";

const Input = (props) => {
  let fieldInput = <Field type={props.type} name={props.name} className='form-control' />;

  if (props.type === "select") {
    fieldInput = (
      <Field as='select' className='form-control' name={props.name}>
        {props.children}
      </Field>
    );
  }

  return (
    <div className='form-group'>
      <label>{props.label}</label>
      {fieldInput}
      <ErrorMessage name={props.name}>
        {(message) => (
          <span className='error-msg'>
            <i className='fa fa-warning'></i> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Input;
