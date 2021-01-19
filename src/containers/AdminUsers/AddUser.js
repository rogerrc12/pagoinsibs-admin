import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserInit, getUserDataInit, editUserInit } from "../../store/actions/users";

import Input from "../../components/UI/formItems/Input";
import CedulaInput from "../../components/UI/formItems/CedulaInput";
import SubmitButton from "../../components/UI/formItems/SubmitButton";

const initialValues = (values) => ({
  first_name: values.firstName || "",
  last_name: values.lastName || "",
  ci_type: values.cedula ? values.cedula.substring(0, 1) : "V",
  ci_number: values.cedula ? values.cedula.substring(1, values.cedula.length) : "",
  email: values.email || "",
  password: "",
  confirm_password: "",
  role_id: values.roleId || "",
});

const formSchema = Yup.object().shape({
  first_name: Yup.string().required("Debes colocar el primer nombre"),
  last_name: Yup.string().required("Debes colocar el primer apellido"),
  ci_type: Yup.string().required("Debes seleccionar el tipo de cédula"),
  ci_number: Yup.string()
    .required("Debes colocar el número de cédula")
    .matches(/^[0-9]{5,9}$/, "Número de cédula inválido. Por favor revisa los datos"),
  email: Yup.string().required("Debes colocar el correco electrónico"),
  password: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*+=]{6,15}$/, "Contraseña inválida. Solo se permiten estos caraceres (@#$%^*)"),
  confirm_password: Yup.string()
    .required("Debes confirmar la contraseña")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  role_id: Yup.number().required("Debes seleccionar un rol para este usuario"),
});

const AddUser = (props) => {
  const { params } = props.match;
  const { id } = params;
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) dispatch(getUserDataInit(+id));
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => dispatch(id ? editUserInit(+id, values) : addUserInit(values));

  return (
    <>
      <section className='content-header form-header'>
        <h3 className='font-weight-bold'>{id ? "Editar" : "Agregar"} usuario</h3>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-md-6'>
            <Formik initialValues={initialValues(id ? userInfo : {})} validationSchema={formSchema} onSubmit={onSubmit} enableReinitialize>
              {({ isValid }) => (
                <Form>
                  <div className='box box-primary' style={{ padding: 25 }}>
                    <Input name='first_name' type='text' label='Primer nombre' />
                    <Input name='last_name' type='text' label='Primer apellido' />
                    <CedulaInput typeName='ci_type' numberName='ci_number' />
                    <Input type='email' name='email' label='Correo electrónico' />
                    <Input type='password' name='password' label='Contraseña' />
                    <Input type='password' name='confirm_password' label='Confimar contraseña' />
                    <Input type='select' name='role_id' label='Rol de usuario'>
                      <option value=''>selecciona un rol</option>
                      <option value={3}>Operador</option>
                      <option value={2}>Manager</option>{" "}
                    </Input>

                    <SubmitButton className='btn-primary' disabled={!isValid}>
                      {id ? "Editar" : "Agregar"} usuario
                    </SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddUser;
