import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es);

const validationSchema = Yup.object({
    fromDate: Yup.date().required('Debes seleccionar una fecha desde.'),
    toDate: Yup.date().required('Debes seleccionar una fecha hasta.'),
    reportType: Yup.string().required('Selecciona un tipo de reporte'),
    bankId: Yup.string()
        .when('reportType', {
            is: 'pending-bank',
            then: Yup.string().required('El banco es obligatorio para este reporte.')
        }),
    supplierId: Yup.number()
        .when('reportType', {
            is: 'pending-supplier',
            then: Yup.number().required('El comercio es obligatorio para este reporte.')
        })
});

const initalValues = {
    reportType: '', fromDate: '', toDate: '', bankId: '', supplierId: ''
}

const GenerateReportForm = (props) => {
    const insibsBanks = props.banks.filter(bank => bank.isInsibs === true);

    const onChangeDate = (date, form, field) => {
        form.setFieldValue(field.name, date);
    }

    const banksList = reportType => reportType === "pending-bank" || reportType === "charged-payments" ? (
        <div className="form-group">
            <label>Banco</label>
            <Field as="select" name="bankId" className="form-control">
                <option value="">Selecciona un banco</option>
                {insibsBanks.map(bank => (
                    <option key={bank.id} value={bank.id}>{bank.bankName}</option>
                ))}
            </Field>
            <ErrorMessage name="bankId">
                {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
            </ErrorMessage>
        </div>
    ) : null;

    const suppliersList = reportType => reportType === "pending-supplier" ? (
        <div className="form-group">
            <label>Comercio</label>
            <Field as="select" name="supplierId" className="form-control">
                <option value="">Selecciona un comercio</option>
                {props.suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
            </Field>
            <ErrorMessage name="supplierId">
                {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
            </ErrorMessage>
        </div>
    ) : null;

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        const result = await props.generateReport(values);
        if (result) resetForm();
    }

    return (
        <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values }) => 
                <Form>
                    <div className="form-group">
                        <label>Tipo de reporte</label>
                        <Field as="select" name="reportType" className="form-control">
                            <option value="">Selecciona una opción</option>
                            <option value="pending-bank">Pendientes por cobrar (banco)</option>
                            <option value="pending-supplier">Pendientes por cobrar (comercio)</option>
                            <option value="expired-payments">Cuotas expiradas/vencidas</option>
                            <option value="charged-payments">Cuotas cobradas (banco)</option>
                        </Field>
                        <ErrorMessage name="reportType">
                            {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                        </ErrorMessage>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fecha desde</label>
                                <Field name="fromDate" component={({ form, field }) => 
                                    <DatePicker
                                        className="form-control"
                                        selected={values.fromDate} 
                                        onChange={date => onChangeDate(date, form, field)}
                                        relativeSize={true}
                                        locale="es"
                                    />
                                } />
                                <ErrorMessage name="fromDate">
                                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fecha hasta</label>
                                <Field name="toDate" component={({ form, field }) => 
                                    <DatePicker 
                                        className="form-control"
                                        selected={values.toDate} 
                                        onChange={date => onChangeDate(date, form, field)}
                                        relativeSize={true}
                                        minDate={values.fromDate}
                                    />
                                } />
                                <ErrorMessage name="toDate">
                                    {message => <span className="error-msg"><i className="fa fa-warning"></i> {message}</span>}
                                </ErrorMessage>
                            </div>
                        </div>
                    </div>

                    {banksList(values.reportType)}
                    {suppliersList(values.reportType)}

                    <button type="submit" className="btn btn-primary">Generar reporte</button>
                </Form>
            }
        </Formik>
    )
}

export default GenerateReportForm;
