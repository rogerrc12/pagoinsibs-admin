import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import * as actions from "../../../../../../store/actions";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Debes colocar un nombre para el producto."),
  amount: Yup.number().typeError("Debes colocar solo números.").required("Debes colocar un monto."),
  interestRate: Yup.number().required("Debes colocar una tasa de interés.").min(0, "Debe ser mayor a 0.").max(1, "Debe ser menor a 1"),
  maxDebitMonths: Yup.number().required("Debes seleccionar los meses máximos a domiciliar"),
  currencyId: Yup.number().required("Debes seleccionar la moneda correspondiente."),
});

const EditProduct = (props) => {
  const { getProductData, editProduct, productData, currencies } = props;
  const { supplier_id, product_id } = props.match.params;

  const initialValues = {
    name: productData.name || "",
    amount: Number(productData.amount) || 0,
    interestRate: Number(productData.interestRate) || 0,
    maxDebitMonths: productData.maxDebitMonths || "",
    currencyId: productData.currencyId || "",
  };

  useEffect(() => {
    getProductData(product_id);
  }, [getProductData, product_id]);

  const onSubmit = async (values) => editProduct(values, supplier_id, product_id);

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>Editar Producto de la empresa</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-xs-6'>
            <div className='box box-primary'>
              {/* form start */}
              <Formik initialValues={initialValues} validationSchema={formSchema} enableReinitialize={true} onSubmit={onSubmit}>
                {({ values, isValid }) => (
                  <Form>
                    <div className='box-body'>
                      <div className='form-group'>
                        <label>Nombre del producto</label>
                        <Field type='text' className='form-control' placeholder='Nombre o alias' name='name' />
                        <ErrorMessage name='name'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning' /> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Monto del producto</label>
                        <Field type='text' className='form-control' name='amount' inputMode='numeric' />
                        <ErrorMessage name='amount'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning' /> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Tasa de interés</label>
                        <Field type='number' className='form-control' name='interestRate' inputMode='numeric' />
                        <small>Colocar en decimales (.)</small>
                        <ErrorMessage name='interestRate'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning' /> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      {values.interestRate && values.amount ? (
                        <div className='form-group'>
                          <p style={{ fontWeight: "bold" }}>Monto total: {(+values.amount * (+values.interestRate + 1)).toFixed(2)} </p>
                        </div>
                      ) : null}

                      <div className='form-group'>
                        <label>Máximo de meses para domiciliar</label>
                        <Field as='select' className='form-control' name='maxDebitMonths'>
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
                        </Field>
                        <ErrorMessage name='maxDebitMonths'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning' /> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Moneda</label>
                        <Field as='select' className='form-control' name='currencyId'>
                          {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>{`${currency.name} (${currency.symbol})`}</option>
                          ))}
                        </Field>
                        <ErrorMessage name='currencyId'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning' /> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className='box-footer'>
                      <button type='submit' disabled={!isValid} className='btn btn-primary'>
                        Editar producto
                      </button>
                    </div>
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
    productData: state.suppliers.productData,
    currencies: state.activity.currencies,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductData: (productId) => dispatch(actions.getProductData(productId)),
  editProduct: (values, supplierId, productId) => dispatch(actions.editProductInit(values, supplierId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProduct));
