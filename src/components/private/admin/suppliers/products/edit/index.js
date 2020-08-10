import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import {
  editProduct,
  getProductData,
} from "../../../../../../actions/suppliers";

const formSchema = Yup.object().shape({
  product_name: Yup.string().required(
    "Debes colocar un nombre para el producto."
  ),
  product_amount: Yup.number()
    .typeError("Debes colocar solo números.")
    .required("Debes colocar un monto."),
  interest_rate: Yup.number()
    .required("Debes colocar una tasa de interés.")
    .min(0, "Debe ser mayor a 0.")
    .max(1, "Debe ser menor a 1"),
  debit_months: Yup.number().required(
    "Debes seleccionar los meses máximos a domiciliar"
  ),
});

const EditProduct = withRouter(
  ({ getProductData, editProduct, productData, history, match }) => {
    const { supplier_id, product_id } = match.params;
    const initialValues = {
      product_name: productData.name || "",
      product_amount: Number(productData.amount) || 0,
      interest_rate: Number(productData.interestRate) || 0,
      debit_months: productData.maxDebitMonths || "",
    };

    useEffect(() => {
      getProductData(product_id);
      // eslint-disable-next-line
    }, []);

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
      if (await editProduct(values, supplier_id, product_id)) {
        resetForm();
        setSubmitting(false);
        setTimeout(
          () => history.push(`/suppliers/profile/${supplier_id}`),
          1500
        );
      }
    };

    return (
      <>
        <section className="content-header form-header">
          <h2 className="font-weight-bold">Editar Producto de la empresa</h2>
        </section>
        <section className="content">
          <div className="row form-row">
            <div className="col-xs-6">
              <div className="box box-primary">
                {/* form start */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={formSchema}
                  enableReinitialize={true}
                  onSubmit={onSubmit}
                >
                  {({ values, isValid }) => (
                    <Form>
                      <div className="box-body">
                        <div className="form-group">
                          <label>Nombre del producto</label>
                          <Field
                            type="text"
                            className="form-control"
                            placeholder="Nombre o alias"
                            name="product_name"
                          />
                          <ErrorMessage name="product_name">
                            {(message) => (
                              <span className="error-msg">
                                <i className="fa fa-warning" /> {message}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="form-group">
                          <label>Monto del producto</label>
                          <Field
                            type="text"
                            className="form-control"
                            name="product_amount"
                            inputMode="numeric"
                          />
                          <ErrorMessage name="product_amount">
                            {(message) => (
                              <span className="error-msg">
                                <i className="fa fa-warning" /> {message}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="form-group">
                          <label>Tasa de interés</label>
                          <Field
                            type="number"
                            className="form-control"
                            name="interest_rate"
                            inputMode="numeric"
                          />
                          <small>Colocar en decimales (.)</small>
                          <ErrorMessage name="interest_rate">
                            {(message) => (
                              <span className="error-msg">
                                <i className="fa fa-warning" /> {message}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>

                        {values.interest_rate && values.product_amount ? (
                          <div className="form-group">
                            <p style={{ fontWeight: "bold" }}>
                              Monto total:{" "}
                              {(
                                +values.product_amount *
                                (+values.interest_rate + 1)
                              ).toFixed(2)}{" "}
                            </p>
                          </div>
                        ) : null}

                        <div className="form-group">
                          <label>Máximo de meses para domiciliar</label>
                          <Field
                            as="select"
                            className="form-control"
                            name="debit_months"
                          >
                            <option value="">Selecciona una opción</option>
                            <option value="1">1 mes</option>
                            <option value="2">2 meses</option>
                            <option value="3">3 meses</option>
                            <option value="4">4 meses</option>
                            <option value="5">5 meses</option>
                            <option value="6">6 meses</option>
                            <option value="7">7 meses</option>
                            <option value="8">8 meses</option>
                            <option value="9">9 meses</option>
                            <option value="10">10 meses</option>
                            <option value="11">11 meses</option>
                            <option value="12">12 meses</option>
                          </Field>
                          <ErrorMessage name="debit_months">
                            {(message) => (
                              <span className="error-msg">
                                <i className="fa fa-warning" /> {message}
                              </span>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="box-footer">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="btn btn-primary"
                        >
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
  }
);

const mapStateToProps = (state) => {
  return {
    productData: state.suppliers.productData,
  };
};

export default connect(mapStateToProps, { editProduct, getProductData })(
  EditProduct
);
