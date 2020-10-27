import React, { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { withRouter, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Spinner from "../../UI/Spinner";
// REDUX
import { connect } from "react-redux";
import { getBankPayments, generateCiserFile, uploadSiserFile } from "../../../store/actions/bankPayments";
// SWEETALERT
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const useStyles = makeStyles({ table: { minWidth: 650 } });

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "correlative_id", label: "referencia del débito", minWidth: 170 },
  { id: "amount", label: "monto a cobrar", minWidth: 140 },
  { id: "client_cedula", label: "cédula de identidad", minWidth: 140 },
  { id: "client_name", label: "nombre cliente", minWidth: 180 },
  { id: "client_account_number", label: "número de cuenta a debitar", minWidth: 150 },
  { id: "client_id", label: "número de cliente", minWidth: 140 },
];

function formatAmount(amount) {
  return Number(amount).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MercantilPayment = withRouter(({ getBankPayments, bank_payments, generateCiserFile, uploadSiserFile, loading, history }) => {
  // GET BANKID PARAMS
  let query = useQuery();
  const bankId = query.get("bankId");
  const bankName = query.get("bankName");

  useEffect(() => {
    if (bankId) getBankPayments(bankId);
    return () => null;
  }, [getBankPayments, bankId]);

  const classes = useStyles();

  // process upload of siser file for completing payments
  const fileTextRef = useRef();

  const onFileChange = (e) => {
    const { value } = e.target;
    if (!value) return null;
    const filename = value.split("h\\")[1];
    fileTextRef.current.innerText = filename;
  };

  const showSiserInputFile = () =>
    MySwal.fire({
      html: (
        <Formik initialValues={{ file: "" }} onSubmit={(values) => uploadSiserFile(values)}>
          {({ setFieldValue }) => (
            <Form className='form-upload-file'>
              <h4>Cargar archivo SISER</h4>
              <div className='input-group input-group-file'>
                <div className='input-group-addon'>
                  <input
                    type='file'
                    id='siser-file'
                    accept='.xls, .xlsx'
                    onChange={(e) => {
                      setFieldValue("file", e.currentTarget.files[0]);
                      setFieldValue("bank_id", bankId);
                      onFileChange(e);
                    }}
                  />
                  <label htmlFor='siser-file' className='file-upload-label'>
                    Cargar archivo
                  </label>
                </div>
                <span className='input-file-text' ref={fileTextRef}>
                  No hay archivo...
                </span>
              </div>
              <button type='submit' className={`btn btn-primary ld-ext-right ${loading && "running"}`} disabled={loading}>
                Procesar archivo
                <div className='ld ld-ring ld-spin' />
              </button>
            </Form>
          )}
        </Formik>
      ),
      showConfirmButton: false,
    });

  const SectionHeader = () => (
    <section className='content-header'>
      <h2 className='font-weight-bold'>Pagos para procesar ({bankName})</h2>
      <div className='content__button-action'>
        {bank_payments[0] && bank_payments[0].correlative.processed ? (
          <button className='btn btn-success' style={{ marginRight: "15px" }} onClick={showSiserInputFile}>
            <i className='fa fa fa-file-excel-o' style={{ marginRight: "5px" }} /> Cargar pagos SISER
          </button>
        ) : null}
        <button
          className={`btn btn-warning ld-ext-right ${loading && "running"}`}
          disabled={loading}
          onClick={() => generateCiserFile(bankId, history)}>
          <i className='fa fa-file-excel-o' style={{ marginRight: "5px" }} /> Crear archivo SISER
          <div className='ld ld-ring ld-spin' />
        </button>
      </div>
    </section>
  );

  return (
    <>
      {SectionHeader()}
      <section className='content'>
        {loading ? (
          <Spinner show={loading} />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bank_payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.registerID}</TableCell>
                    <TableCell>{payment.correlativeId}</TableCell>
                    <TableCell>{formatAmount(payment.amount)}</TableCell>
                    <TableCell>{payment.user.cedula}</TableCell>
                    <TableCell>{payment.user.firstName + " " + payment.user.lastName}</TableCell>
                    <TableCell>{payment.clientAccNumber}</TableCell>
                    <TableCell>{payment.user.clientId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    bank_payments: state.bankPayments.bank_payments,
    loading: state.loading.loading,
  };
};

export default connect(mapStateToProps, { getBankPayments, generateCiserFile, uploadSiserFile })(MercantilPayment);
