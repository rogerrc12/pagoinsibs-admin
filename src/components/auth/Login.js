import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// REDUX
import { connect } from "react-redux";
import { loginUserInit } from "../../store/actions/auth";

const initialValues = { email: "", password: "" };
const formSchema = Yup.object().shape({
  email: Yup.string().required("Debes colocar un usuario."),
  password: Yup.string()
    .required("Debes colocar una contraseña.")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^*+=]{6,15}$/i, "Contraseña inválida."),
});

const Login = ({ loginUserInit, isAuthenticated, isProcessing, location }) => {
  let from;

  if (location.state) {
    from = location.state.from;
  } else {
    from = { pathname: "/activity" };
  }

  if (isAuthenticated) return <Redirect to={from} />;

  return (
    <>
      <img src={process.env.PUBLIC_URL + "/img/logo-blanco.png"} alt='logo insibs' />
      <div className='login-box'>
        <div className='login-box-body'>
          <p className='login-box-msg'>Iniciar Sesión</p>

          <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={(values) => loginUserInit(values)}>
            {({ isValid }) => (
              <Form>
                <div className='form-group has-feedback'>
                  <Field type='text' className='form-control' name='email' placeholder='Usuario' />
                  <span className='glyphicon glyphicon-envelope form-control-feedback' />
                </div>
                <ErrorMessage name='email'>
                  {(message) => (
                    <span className='error-msg'>
                      <i className='fa fa-warning'></i> {message}
                    </span>
                  )}
                </ErrorMessage>
                <div className='form-group has-feedback'>
                  <Field type='password' className='form-control' name='password' placeholder='Contraseña' autoComplete='contraseña' />
                  <span className='glyphicon glyphicon-lock form-control-feedback' />
                </div>
                <ErrorMessage name='password'>
                  {(message) => (
                    <span className='error-msg'>
                      <i className='fa fa-warning'></i> {message}
                    </span>
                  )}
                </ErrorMessage>
                <div className='row'>
                  <div className='col-xs-4'>
                    <button type='submit' className={`btn btn-primary btn-large btn-flat ld-ext-right ${isProcessing && "running"}`} disabled={isProcessing || !isValid}>
                      Iniciar Sesión
                      <span className='ld ld-ring ld-spin' />
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isProcessing: state.auth.isProcessing,
    loading: state.loading.loading,
  };
};

export default connect(mapStateToProps, { loginUserInit })(Login);
