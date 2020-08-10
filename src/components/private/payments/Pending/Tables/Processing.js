import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// React Table
import { CheckBox } from '@material-ui/icons';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, Paper } from '@material-ui/core';
import TablePaginationActions from '../../../../../helpers/TablePagination';
// REDUX
import { connect } from 'react-redux';

const columns = [
  { id: 'status', label: 'Estado', minWidth: 100 },
  { id: 'user', label: 'Usuario', minWidth: 150 },
  { id: 'cedula', label: 'Cédula', minWidth: 100 },
  { id: 'bank_name', label: 'Banco', minWidth: 150 },
  { id: 'amount', label: 'Monto', minWidth: 100 },
  { id: 'start_payment_date', label: 'Inicio de cobro', minWidth: 160 },
  { id: 'supplier_name', label: 'Empresa', minWidth: 160 },
  { id: 'actions', label: 'Acciones', minWidth: 150 }
]

const ProcessingPaymentsTable = ({ payments }) => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, payments ? payments.length : 0 - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <section className="content-header">
        <div className="section-title">
          <h2 className="font-weight-bold">Pagos procesandose</h2>
        </div>
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
                {payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(payment => (
                  <TableRow hover key={payment.id} role="checkbox" tabIndex={-1}>
                    <TableCell className={'status ' + payment.status.name}>
                      {payment.status.name}
                    </TableCell>
                    <TableCell>{payment.user.firstName + ' ' + payment.user.lastName}</TableCell>
                    <TableCell>{payment.user.cedula}</TableCell>
                    <TableCell>{payment.bankName}</TableCell>
                    <TableCell>{payment.amount} Bs.</TableCell>
                    <TableCell>
                      <Moment format="DD/MM/YYYY">{payment.startPaymentDate}</Moment>
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

ProcessingPaymentsTable.propTypes = {
  payments: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps)(ProcessingPaymentsTable);