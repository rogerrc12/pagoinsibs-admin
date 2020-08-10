import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { addBankAcc } from '../../../../../actions/suppliers';

const initialValues = { bank_id: '', acc_number: '', acc_type: '' }

const formSchema = Yup.object().shape({
  bank_id: Yup.string().required('Debes elegir un banco'),
  acc_number: Yup.string().required('Debes colocar un número de cuenta').matches(/^[0-9]{20}$/, 'Deben ser 20 caracteres. Por favor revisa los datos.'),
  acc_type: Yup.string().required('Debes elegir un tipo de cuenta')
})

const AddBankAccount = ({ match, addBankAcc, history }) => {
  const { id } = match.params;

  return (
    <>
    <section className="content-header form-header">
      <h2 className="font-weight-bold">Agregar Cuenta bancaria</h2>
    </section>
    <section className="content">
      <div className="row form-row">
        <div className="col-md-6">
          <div className="box box-primary">
            <Formik initialValues={initialValues} validationSchema={formSchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                if (await addBankAcc(id, values)) {
                  resetForm(initialValues);
                  setSubmitting(false);
                  history.push(`/suppliers/profile/${id}`)
                }
              }}
            >
            <Form>
              <div className="box-body">

                <div className="form-group">
                  <label>Nombre del banco</label>
                  <Field as="select" name="bank_id" className="form-control">
                    <option value="">seleccione una opción</option>
                    <option value="0134">Banesco</option>
                    <option value="0102">Banco de Venezuela</option>
                    <option value="0175">Banco Bicentenario</option>
                    <option value="0163">Banco del Tesoro</option>
                    <option value="0108">Banco Provincial</option>
                    <option value="0105">Banco Mercantil</option>
                    <option value="0116">Banco Occidental de Descuento</option>
                    <option value="0151">Banco Fondo Común</option>
                  </Field>
                  <ErrorMessage name="bank_name">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Número de cuenta</label>
                  <Field type="text" name="acc_number" className="form-control" />
                  <ErrorMessage name="acc_number">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Tipo de cuenta</label>
                  <Field as="select" name="acc_type" className="form-control" >
                    <option value="">Selecciona una opción</option>
                    <option value="corriente">Corriente</option>
                    <option value="ahorros">Ahorros</option>
                  </Field>
                  <ErrorMessage name="acc_type">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="box-footer">
                  <button type="submit" className="btn btn-primary">Agregar cuenta</button>
                </div>
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

AddBankAccount.propTypes = {
  addBankAcc: PropTypes.func.isRequired
}

export default withRouter(connect(null, { addBankAcc })(AddBankAccount));
