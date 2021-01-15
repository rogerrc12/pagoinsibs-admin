import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { productValues } from "../../helpers/formValues";
import { productValidationForm } from "../../helpers/validations";

import Input from "../../components/UI/formItems/Input";
import Checkbox from "../../components/UI/formItems/Checkbox";
import SubmitButton from "../../components/UI/formItems/SubmitButton";

const EditProduct = (props) => {
  const { getProductData, editProduct, addProduct, productData, currencies } = props;
  const { product_id, supplier_id } = props.match.params;

  useEffect(() => {
    if (product_id) {
      getProductData(product_id);
    }
  }, [getProductData, product_id]);

  const onSubmit = async (values) => (product_id ? editProduct(values, product_id) : addProduct(values, supplier_id));

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>{product_id ? "Editar" : "Agregar nuevo"} producto</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-xs-6'>
            <div className='box box-primary'>
              {/* form start */}
              <Formik initialValues={productValues(productData)} validationSchema={productValidationForm} enableReinitialize onSubmit={onSubmit}>
                {({ values, isValid }) => (
                  <Form>
                    <div className='box-body'>
                      <Input type='text' placeholder='Nombre o alias' name='name' label='Nombre del producto' />
                      <Input type='text' placeholder='Monto' name='amount' inputMode='numeric' label='Monto del producto' />
                      <Input type='select' name='currencyId' label='Moneda'>
                        <option value=''>Selecciona una moneda</option>
                        {currencies.map((currency) => (
                          <option key={currency.id} value={currency.id}>{`${currency.name} (${currency.symbol})`}</option>
                        ))}
                      </Input>
                      <Checkbox name='currencyConversion' label='¿El producto se podrá pagar en multimoneda?' />
                      <hr style={{ marginTop: "1rem", marginBottom: "1rem", border: 0, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }} />
                      <Checkbox name='isDirectDebit' label='¿El producto será domiciliado?' />

                      {values.isDirectDebit && (
                        <>
                          <Input type='number' name='interestRate' inputMode='numeric' label='Tasa de interés' />
                          <small>Colocar en decimales (.)</small>

                          {values.interestRate && values.amount ? (
                            <div className='form-group'>
                              <p style={{ fontWeight: "bold" }}>Monto total: {(+values.amount * (+values.interestRate + 1)).toFixed(2)} </p>
                            </div>
                          ) : null}

                          <Input type='select' name='maxDebitMonths' label='Máximo de meses para domiciliar'>
                            <option value=''>Selecciona una opción</option>
                            <option value='1'>1 mes</option>
                            <option value='2'>2 meses</option>
                            <option value='3'>3 meses</option>
                            <option value='4'>4 meses</option>
                            <option value='5'>5 meses</option>
                            <option value='6'>6 meses</option>
                            <option value='7'>7 meses</option>
                            <option value='8'>8 meses</option>
                            <option value='9'>9 meses</option>
                            <option value='10'>10 meses</option>
                            <option value='11'>11 meses</option>
                            <option value='12'>12 meses</option>
                          </Input>
                        </>
                      )}
                    </div>
                    <SubmitButton disabled={!isValid} className='btn-primary'>
                      Editar producto
                    </SubmitButton>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
    currencies: state.activity.currencies,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductData: (productId) => dispatch(actions.getProductDataInit(productId)),
  editProduct: (values, productId) => dispatch(actions.editProductInit(values, productId)),
  addProduct: (values, supplierId) => dispatch(actions.addProductInit(values, supplierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProduct));
