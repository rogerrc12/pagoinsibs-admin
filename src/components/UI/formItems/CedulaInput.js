import React from "react";
import { Field, ErrorMessage } from "formik";

const CedulaInput = (props) => {
  return (
    <div className='form-group'>
      <label>Cédula</label>
      <div className='input-group'>
        <span className='input-group-addon'>
          <Field as='select' name={props.typeName}>
            <option value='V'>V</option>
            <option value='E'>E</option>
          </Field>
        </span>
        <Field type='text' name={props.numberName} className='form-control' placeholder='Número de cédula' />
      </div>
      <ErrorMessage name={props.typeName}>
        {(message) => (
          <span className='error-msg'>
            <i className='fa fa-warning'></i> {message}
          </span>
        )}
      </ErrorMessage>
      <ErrorMessage name={props.numberName}>
        {(message) => (
          <span className='error-msg'>
            <i className='fa fa-warning'></i> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CedulaInput;
