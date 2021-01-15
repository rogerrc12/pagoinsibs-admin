import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { accountValidationForm } from "../../helpers/validations";
import { accountValues } from "../../helpers/formValues";
// REDUX
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import SubmitButton from "../../components/UI/formItems/SubmitButton";
import Input from "../../components/UI/formItems/Input";

const AddBankAccount = (props) => {
  const { banks, addAccount, getAccountData } = props;
  const { supplier_id } = props.match.params;
  const queryParams = new URLSearchParams(props.location.search);
  const formType = queryParams.get("type");

  useEffect(() => {
    if (formType === "edit") getAccountData();
  }, [formType, getAccountData]);

  const insibsBanks = banks.filter((bank) => bank.isInsibs);

  const onSubmit = (values) => addAccount(values, supplier_id);

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>{formType === "add" ? "Agregar" : "Editar"} Cuenta bancaria</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-md-6'>
            <div className='box box-primary'>
              <Formik initialValues={accountValues()} validationSchema={accountValidationForm} onSubmit={onSubmit}>
                <Form>
                  <div className='box-body'>
                    <Input type='select' name='bank_id' label='Banco'>
                      <option value=''>Selecciona un banco</option>
                      {insibsBanks.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.bankName}
                        </option>
                      ))}
                    </Input>

                    <Input name='acc_number' label='Número de cuenta' type='text' />
                    <Input name='acc_type' label='Tipo de cuenta' type='select'>
                      <option value=''>Selecciona una opción</option>
                      <option value='corriente'>Corriente</option>
                      <option value='ahorros'>Ahorros</option>
                    </Input>

                    <SubmitButton className='btn-primary'>Agregar cuenta</SubmitButton>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

AddBankAccount.propTypes = {
  banks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  banks: state.activity.banks,
});

const mapDispatchToProps = (dispatch) => ({
  addAccount: (values, supplierId) => dispatch(actions.addSupplierAccountInit(values, supplierId)),
  getAccountData: (supplierId) => dispatch(actions.getSupplierAccountInit(supplierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddBankAccount));
