import React from "react";
import { Field, ErrorMessage } from "formik";

import classes from "./FormItems.module.css";

const Checkbox = (props) => {
  return (
    <div className={`form-group ${classes.Checkbox}`}>
      <label>
        <Field name={props.name} type='checkbox' {...props} />
        <span>{props.label}</span>
      </label>
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

export default Checkbox;
