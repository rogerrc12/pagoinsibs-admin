import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../../UI/formItems/Input";
import SubmitButton from "../../UI/formItems/SubmitButton";

import { currencyFormValues } from "../../../helpers/formValues";

const validation = Yup.object().shape({
  name: Yup.string().required("Debes colocar el nombre de la moneda."),
  symbol: Yup.string().required("Debes colocar el símbolo de la moneda."),
  buyPrice: Yup.string().required("Debes colocar un precio de compra."),
  sellPrice: Yup.string().required("Debes colocar un precio de venta."),
});

const AddCurrencyForm = (props) => {
  const onSubmit = (values) => props.edit(props.currencyId, values);

  return (
    <Formik initialValues={currencyFormValues(props.data)} validationSchema={validation} onSubmit={onSubmit} enableReinitialize>
      {({ isValid }) => (
        <Form>
          <div className='box-body'>
            <Input name='name' type='text' label='Nombre de la moneda' />
            <Input name='symbol' type='text' label='Simbolo a mostrar' />
            <Input name='buyPrice' type='number' label='Tasa de compra' disabled={props.data.id === 1} />
            <Input name='sellPrice' type='number' label='Tasa de venta' disabled={props.data.id === 1} />

            <SubmitButton className='btn-primary' disabled={!isValid}>
              Editar moneda
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCurrencyForm;
