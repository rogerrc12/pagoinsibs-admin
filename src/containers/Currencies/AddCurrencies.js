import React from "react";
import AddCurrencyForm from "../../components/private/currencies/AddCurrencyForm";

const AddCurrencies = (props) => {
  console.log(props);

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>Agregar nueva moneda</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-md-6'>
            <div className='box box-primary'>
              <AddCurrencyForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCurrencies;
