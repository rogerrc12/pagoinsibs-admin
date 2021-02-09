import React from "react";
import { Field, ErrorMessage } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const Datepicker = (props) => {
  const { label, name, value, ...rest } = props;

  return (
    <div className='form-group'>
      <label>{label}</label>
      <Field
        name={name}
        component={({ form, field }) => (
          <DatePicker className='form-control' selected={value} onChange={(date) => form.setFieldValue(field.name, date)} relativeSize locale='es' {...rest} />
        )}
      />
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

export default Datepicker;
