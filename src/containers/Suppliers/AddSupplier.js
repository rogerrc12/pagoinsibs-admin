import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { supplierValues } from "../../helpers/formValues";
import { validateSupplierForm } from "../../helpers/validations";
// REDUX
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const Add = ({ addSupplier, editSupplier, match, getSupplierProfile }) => {
  const { id } = match.params;

  const { profile } = useSelector((state) => state.suppliers.profile);

  useEffect(() => {
    if (id) getSupplierProfile(id);
  }, [id, getSupplierProfile]);

  const onSubmit = (values) => {
    id ? editSupplier(values, id) : addSupplier(values);
  };

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>{id ? "Editar" : "Agregar"} Comercio</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-md-6'>
            <div className='box box-primary'>
              {/* form start */}
              <Formik initialValues={supplierValues(id ? profile : "")} validationSchema={validateSupplierForm} onSubmit={onSubmit} enableReinitialize>
                {() => (
                  <Form>
                    <div className='box-body'>
                      <div className='form-group'>
                        <label>Tipo de empresa</label>
                        <Field as='select' name='supplier_type' className='form-control'>
                          <option value=''>Selecciona una opción</option>
                          <option value={1}>Empresa de servicios</option>
                          <option value={2}>Empresa de productos</option>
                        </Field>
                        <ErrorMessage name='supplier_type'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Nombre de la empresa</label>
                        <Field type='text' className='form-control' placeholder='Nombre o alias' name='name' />
                        <ErrorMessage name='name'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>RIF (solo números)</label>
                        <Field type='text' className='form-control' placeholder='Solo números' name='rif' />
                        <ErrorMessage name='rif'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Dirección corta</label>
                        <Field type='text' className='form-control' name='address' />
                        <ErrorMessage name='address'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Ciudad</label>
                        <Field type='text' className='form-control' name='city' />
                        <ErrorMessage name='city'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Estado</label>
                        <Field as='select' name='state' className='form-control'>
                          <option value=''>selecciona una opción</option>
                          <option value='amazonas'>Amazonas</option>
                          <option value='anzoátegui'>Anzoátegui</option>
                          <option value='apure'>Apure</option>
                          <option value='aragua'>Aragua</option>
                          <option value='barinas'>Barinas</option>
                          <option value='bolivar'>Bolivar</option>
                          <option value='carabobo'>Carabobo</option>
                          <option value='cojedes'>Cojedes</option>
                          <option value='delta Amacuro'>Delta Amacuro</option>
                          <option value='distrito Capital'>Distrito Capital</option>
                          <option value='falcon'>Falcon</option>
                          <option value='guarico'>Guárico</option>
                          <option value='lara'>Lara</option>
                          <option value='merida'>Mérida</option>
                          <option value='miranda'>Miranda</option>
                          <option value='monagas'>Monagas</option>
                          <option value='nueva Esparta'>Nueva Esparta</option>
                          <option value='portuguesa'>Portuguesa</option>
                          <option value='sucre'>Sucre</option>
                          <option value='tachira'>Táchira</option>
                          <option value='trujillo'>Trujillo</option>
                          <option value='vargas'>Vargas</option>
                          <option value='yaracuy'>Yaracuy</option>
                          <option value='zulia'>Zulia</option>
                        </Field>
                        <ErrorMessage name='state'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Correo de contacto</label>
                        <Field type='email' name='email' className='form-control' />
                        <ErrorMessage name='email'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Persona encargada</label>
                        <Field type='text' className='form-control' name='manager_fname' placeholder='Nombre' />
                        <Field type='text' className='form-control mt-3' name='manager_lname' placeholder='Apellido' />
                        <ErrorMessage name='manager_fname'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                        <ErrorMessage name='manager_lname'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Teléfono Principal</label>
                        <Field type='text' className='form-control' name='local_phone' placeholder='ej. 0243 235 9568' />
                        <ErrorMessage name='local_phone'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className='form-group'>
                        <label>Teléfono Secundario</label>
                        <Field type='text' className='form-control' name='mobile_phone' placeholder='ej. 0424 235 9568' />
                        <ErrorMessage name='mobile_phone'>
                          {(message) => (
                            <span className='error-msg'>
                              <i className='fa fa-warning'></i> {message}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className='box-footer'>
                      <button type='submit' className='btn btn-primary'>
                        {id ? "Editar" : "Agregar"} comercio
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

const mapDispatchToProps = (dispatch) => ({
  addSupplier: (values) => dispatch(actions.addSupplierInit(values)),
  editSupplier: (values, id) => dispatch(actions.editSupplierInit(values, id)),
  getSupplierProfile: (id) => dispatch(actions.getSupplierProfileInit(id)),
});

export default connect(null, mapDispatchToProps)(Add);
