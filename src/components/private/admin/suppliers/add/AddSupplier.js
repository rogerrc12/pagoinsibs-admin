import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { addSupplier } from '../../../../../actions/suppliers';

const initialValues = {
  supplier_type: '', ame: '', rif: '', address: '', city: '', state: '', email: '', manager_fname: '',
  manager_lname: '', local_phone: '', mobile_phone: ''
}

const formSchema = Yup.object().shape({
  supplier_type: Yup.number().required('Debes seleccionar el tipo de empresa'),
  name: Yup.string().required('Debes colocar un nombre'),
  rif: Yup.string().required('Debes colocar un rif').matches(/^[0-9]{3,15}$/, 'Debes colocar un rif válido'),
  address: Yup.string().required('Debes colocar una dirección'),
  city: Yup.string().required('Debes colocar una ciudad'),
  state: Yup.string().required('Debes seleccionar un estado'),
  email: Yup.string().email('Debes colocar un correo válido').required('Debes colcoar un correo'),
  manager_fname: Yup.string().required('Debes colocar el primer nombre'),
  manager_lname: Yup.string().required('Debes colocar el primer apellido'),
  local_phone: Yup.string().matches(/^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, 'Debes colocar un teléfono válido'),
  mobile_phone: Yup.string().matches(/^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, 'Debes colocar un teléfono válido').notRequired()
})

const Add = withRouter(({ addSupplier, history }) => {

  return (
    <>
      <section className="content-header form-header">
        <h2 className="font-weight-bold">Agregar Comercio</h2>
      </section>
      <section className="content">
      <div className="row form-row">
        <div className="col-md-6">
          <div className="box box-primary">
            {/* form start */}
            <Formik initialValues={initialValues} validationSchema={formSchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                if (await addSupplier(values)) {
                  resetForm();
                  setSubmitting(false);
                  setTimeout(() => history.push('/suppliers'), 1500);
                }
              }}
            >
              {() => 
              <Form>
                <div className="box-body">

                  <div className="form-group">
                    <label>Tipo de empresa</label>
                    <Field as="select" name="supplier_type" className="form-control">
                      <option value="">Selecciona una opción</option>
                      <option value={1}>Empresa de servicios</option>
                      <option value={2}>Empresa de productos</option>
                    </Field>
                    <ErrorMessage name="supplier_type">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Nombre de la empresa</label>
                    <Field type="text" className="form-control" placeholder="Nombre o alias" name="name" />
                    <ErrorMessage name="name">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>RIF (solo números)</label>
                    <Field type="text" className="form-control" placeholder="Solo números" name="rif" />
                    <ErrorMessage name="rif">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Dirección corta</label>
                    <Field type="text" className="form-control" name="address" />
                    <ErrorMessage name="address">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Ciudad</label>
                    <Field type="text" className="form-control" name="city" />
                    <ErrorMessage name="city">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Estado</label>
                    <Field as="select" name="state" className="form-control" >
                      <option value="">selecciona una opción</option>
                      <option value="Amazonas">Amazonas</option>
                      <option value="Anzoátegui">Anzoátegui</option>
                      <option value="Apure">Apure</option>
                      <option value="Aragua">Aragua</option>
                      <option value="Barinas">Barinas</option>
                      <option value="Bolivar">Bolivar</option>
                      <option value="Carabobo">Carabobo</option>
                      <option value="Cojedes">Cojedes</option>
                      <option value="Delta Amacuro">Delta Amacuro</option>
                      <option value="Distrito Capital">Distrito Capital</option>
                      <option value="Falcon">Falcon</option>
                      <option value="Guárico">Guárico</option>
                      <option value="Lara">Lara</option>
                      <option value="Mérida">Mérida</option>
                      <option value="Miranda">Miranda</option>
                      <option value="Monagas">Monagas</option>
                      <option value="Nueva Esparta">Nueva Esparta</option>
                      <option value="Portuguesa">Portuguesa</option>
                      <option value="Sucre">Sucre</option>
                      <option value="Táchira">Táchira</option>
                      <option value="Trujillo">Trujillo</option>
                      <option value="Vargas">Vargas</option>
                      <option value="Yaracuy">Yaracuy</option>
                      <option value="Zulia">Zulia</option>
                    </Field>
                    <ErrorMessage name="state">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Correo de contacto</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Persona encargada</label>
                    <Field type="text" className="form-control" name="manager_fname" placeholder="Nombre" />
                    <Field type="text" className="form-control mt-3" name="manager_lname" placeholder="Apellido" />
                    <ErrorMessage name="manager_fname">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                    <ErrorMessage name="manager_lname">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Teléfono Principal</label>
                    <Field type="text" className="form-control" name="local_phone" placeholder="ej. 0243 235 9568" />
                    <ErrorMessage name="local_phone">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Teléfono Secundario</label>
                    <Field type="text" className="form-control" name="mobile_phone" placeholder="ej. 0424 235 9568" />
                    <ErrorMessage name="mobile_phone">
                      {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                    </ErrorMessage>
                  </div>
                  
                </div>
                <div className="box-footer">
                  <button type="submit" className="btn btn-primary">Agregar comercio</button>
                </div>
              </Form>
              }
            </Formik>
          </div> 
        </div>
      </div>
      </section>
    </>   
  )
})


export default connect(null, { addSupplier })(Add);
