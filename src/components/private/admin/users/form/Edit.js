import React, { useEffect } from 'react';
import PropTypes from "prop-types"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { editUser, getUserById } from '../../../../../actions/users';

const formSchema = Yup.object().shape({
  first_name: Yup.string().required('Debes colocar el primer nombre.'),
  last_name: Yup.string().required('Debes colocar el primer apellido.'),
  email: Yup.string().required('Debes colocar el correco electrónico'),
  password: Yup.string().notRequired().matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*+=]{6,15}$/, 'Contraseña inválida. Solo se permiten estos caraceres (@#$%^*)'),
  confirm_password: Yup.string().notRequired().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
  ci_number: Yup.string().required('Coloca una cédula.'),
  role_id: Yup.number().required('Elige el rol del usuario.')
})

const EditUser = withRouter(({ editUser, match, history, userInfo, getUserById }) => {
  const { id } = match.params;
  
  useEffect(() => {
    getUserById(id);
  }, [getUserById, id]);

  const initialValues = {
    first_name: userInfo.firstName || '', 
    last_name: userInfo.lastName || '',
    ci_type: userInfo.cedula ? userInfo.cedula.substring(0, 1) : 'V', 
    ci_number: userInfo.cedula ? userInfo.cedula.substring(1, userInfo.cedula.length) : '', 
    email: userInfo.email || '',
    password: '', 
    confirm_password: '', 
    role_id: userInfo.roleId || ''
  }
  
  return (
    <>
    <section className="content-header form-header">
      <h3 className="font-weight-bold">Editar usuario {userInfo.firstName + ' ' + userInfo.lastName}</h3>
    </section>
    <section className="content">
      <div className="row form-row">
        <div className="col-md-6">
          <div className="box box-primary">
            <Formik initialValues={initialValues} validationSchema={formSchema} enableReinitialize={true}
              onSubmit={async (values, { resetForm }) => {
                if (await editUser(values, id)) {
                  resetForm();
                  setTimeout(() => history.push('/users'), 1500)
                }
              }}
            >
            <Form>
              <div className="box-body">

                <div className="form-group">
                  <label>Nombre</label>
                  <Field type="text" name="first_name" className="form-control" placeholder="Primer nombre"/>
                  <ErrorMessage name="first_name">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Apellido</label>
                  <Field type="text" name="last_name" className="form-control" placeholder="Primer apellido" />
                  <ErrorMessage name="last_name">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Cédula</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <Field as="select" name="ci_type">
                        <option value="V">V</option>
                        <option value="E">E</option>
                      </Field>
                    </span>
                    <Field type="text" name="ci_number" className="form-control" placeholder="Número de cédula" />
                  </div>
                  <ErrorMessage name="ci_type">
                    {message => <span className="error-msg"><i className="fa fa-warning"/> {message}</span>}
                  </ErrorMessage>
                  <ErrorMessage name="ci_number">
                    {message => <span className="error-msg"><i className="fa fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>correo electrónico</label>
                  <Field type="text" name="email" className="form-control" />
                  <ErrorMessage name="email">
                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <Field type="password" name="password" className="form-control" autoComplete="user-password" />
                  <ErrorMessage name="password">
                    {message => <span className="error-msg"><i className="fa fa-warning"/> {message}</span>}
                  </ErrorMessage>
                  <span className="form-msg">Mínimo 6 caracteres y máximo 15.</span>
                </div>

                <div className="form-group">
                  <label>Confirmar contraseña</label>
                  <Field type="password" name="confirm_password" className="form-control" autoComplete="user-password" />
                  <ErrorMessage name="confirm_password">
                    {message => <span className="error-msg"><i className="fa fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label>Rol de usuario</label>
                  <Field as="select" name="role_id" className="form-control">
                    <option value="">selecciona un rol</option>
                    <option value={3}>Operador</option>
                    <option value={2}>Manager</option>
                  </Field>
                  <ErrorMessage name="role_id">
                    {message => <span className="error-msg"><i className="fa fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>

              </div>
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Editar usuario</button>
              </div>
            </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
    </>
  )
});

EditUser.propTypes = {
  userInfo: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    userInfo: state.users.userInfo
  }
}

export default connect(mapStateToProps, { editUser, getUserById })(EditUser);