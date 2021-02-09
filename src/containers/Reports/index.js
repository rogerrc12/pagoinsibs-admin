import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { reportValues } from "../../helpers/formValues";
import { reportValidation } from "../../helpers/validations";
import { generateReportInit } from "../../store/actions";

import DatePicker from "../../components/UI/formItems/Datepicker";
import Input from "../../components/UI/formItems/Input";

const GenerateReportForm = () => {
  const { banks, currencies } = useSelector((state) => state.activity);
  const { suppliers } = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const insibsBanks = banks.filter((bank) => bank.isInsibs === true);

  const banksList = (reportType) =>
    reportType === "pending-bank" || reportType === "charged-payments" ? (
      <Input type='select' label='Banco' name='bankId'>
        <option value=''>Selecciona un banco</option>
        {insibsBanks.map((bank) => (
          <option key={bank.id} value={bank.id}>
            {bank.bankName}
          </option>
        ))}
      </Input>
    ) : null;

  const suppliersList = (reportType) =>
    reportType === "pending-supplier" ? (
      <Input type='select' label='Comercio' name='supplierId'>
        <option value=''>Selecciona un comercio</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </Input>
    ) : null;

  const currenciesList = (reportType) =>
    reportType !== "pending-bank" && (
      <Input type='select' label='Moneda' name='currencyId'>
        <option value=''>Selecciona una opción</option>
        {currencies.map((currency) => (
          <option value={currency.id}>{currency.name}</option>
        ))}
      </Input>
    );

  const onSubmit = (values, { resetForm }) => dispatch(generateReportInit(values, resetForm));

  return (
    <section className='content'>
      <div className='generate-report'>
        <h1>Generar reporte</h1>
        <Formik initialValues={reportValues} validationSchema={reportValidation} onSubmit={onSubmit}>
          {({ values }) => (
            <Form>
              <Input type='select' label='Tipo de reporte' name='reportType'>
                <option value=''>Selecciona una opción</option>
                <option value='pending'>Cuotas pendientes por cobrar</option>
                <option value='pending-bank'>Cuotas pendientes por cobrar (banco)</option>
                <option value='pending-supplier'>Cuotas pendientes por cobrar (comercio)</option>
                <option value='expired-payments'>Cuotas expiradas/vencidas</option>
                <option value='charged-payments'>Cuotas cobradas</option>
              </Input>

              {currenciesList(values.reportType)}

              {values.reportType === "pending-bank" && <p className='form-msg'>El reporte se generará en bolívares.</p>}

              <div className='row'>
                <div className='col-md-6'>
                  <DatePicker name='fromDate' value={values.fromDate} label='Fecha desde' />
                </div>

                <div className='col-md-6'>
                  <DatePicker name='toDate' value={values.toDate} label='Fecha hasta' minDate={values.fromDate} />
                </div>
              </div>

              {banksList(values.reportType)}
              {suppliersList(values.reportType)}

              <button type='submit' className='btn btn-primary'>
                Generar reporte
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default GenerateReportForm;
