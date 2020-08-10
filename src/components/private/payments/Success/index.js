import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// React Table
import { CheckBox } from '@material-ui/icons';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, Paper } from '@material-ui/core';
import TablePaginationActions from '../../../../helpers/TablePagination';
import TableSearch from "../../tableSearch";
// REDUX
import { connect } from 'react-redux';
import { getPayments } from '../../../../actions/payments';

const columns = [
  { id: 'status', label: 'Estado', minWidth: 100 },
  { id: 'user', label: 'Usuario', minWidth: 150 },
  { id: 'cedula', label: 'Cédula', minWidth: 100 },
  { id: 'bank_name', label: 'Banco', minWidth: 150 },
  { id: 'amount', label: 'Monto', minWidth: 100 },
  { id: 'date_issued', label: 'Fecha de creación', minWidth: 160 },
  { id: 'supplier_name', label: 'Empresa', minWidth: 160 },
  { id: 'actions', label: 'Acciones', minWidth: 150 }
]

const SuccessDebitsTable = ({ getPayments, payments, loading }) => {
  useEffect(() => {
    getPayments('success');
  }, [getPayments]);
  
  const [page, setPage] = useState(0);
  const [filteredPayments, setFilteredPayments] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, payments ? payments.length : 0 - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const setFilter = data => setFilteredPayments(data);

  return (
    <>
      <section className="content-header">
        <div className="section-title">
          <h2 className="font-weight-bold">Todos los pagos recibidos</h2>
          <button className={`btn btn-primary ld-ext-right ${loading && 'running'}`}
            onClick={() => getPayments('success')} disabled={loading}
          >
            Actualizar
            <div className="ld ld-ring ld-spin"/>
          </button>
        </div>
        <TableSearch setFilter={setFilter} payments={payments} />
      </section>
      <section className="content">
        <Paper className="activity-table">
          <div style={{ maxHeight: '440px', overflow: 'auto', width: '100%'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(!filteredPayments ? payments : filteredPayments).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(payment => (
                  <TableRow hover key={payment.id} role="checkbox" tabIndex={-1}>
                    <TableCell className={'status ' + payment.status.name}>
                      {payment.status.name}
                    </TableCell>
                    <TableCell>{payment.user.firstName + ' ' + payment.user.lastName}</TableCell>
                    <TableCell>{payment.user.cedula}</TableCell>
                    <TableCell>{payment.bankName}</TableCell>
                    <TableCell>{payment.amount} Bs.</TableCell>
                    <TableCell>
                      <Moment format="DD/MM/YYYY hh:mm a">{payment.createdAt}</Moment>
                    </TableCell>
                    <TableCell>{payment.supplier.name}</TableCell>      
                    <TableCell align="center" className="tableCell-actions">
                      <Link className="table-button" to={`/users-payments/detail/${payment.id}`}> 
                        Ver detalles
                        <CheckBox color="action" fontSize="large" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                <TablePagination
                  rowsPerPageOptions={[4, 8]}
                  count={payments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'Filas por hoja' },
                    native: true,
                  }}
                  labelRowsPerPage='Entradas por página:'
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </section>
    </>
    );
}

SuccessDebitsTable.propTypes = {
  getPayments: PropTypes.func.isRequired,
  payments: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    payments: state.payments.acc_payments,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps, { getPayments })(SuccessDebitsTable);