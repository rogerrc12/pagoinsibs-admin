import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../../UI/formItems/Input";
import SubmitButton from "../../UI/formItems/SubmitButton";

import { currencyFormValues } from "../../../helpers/formValues";

const AddCurrencyForm = () => {
  return (
    <Formik initialValues={() => currencyFormValues()}>
      {({ isValid }) => (
        <Form>
          <div className='box-body'>
            <Input name='name' type='text' label='Nombre de la moneda' />
            <Input name='ISO' type='text' label='Código ISO' />
            <Input name='symbol' type='text' label='Simbolo a mostrar' />

            <SubmitButton className='btn-primary' disabled={!isValid}>
              Agregar moneda
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCurrencyForm;
