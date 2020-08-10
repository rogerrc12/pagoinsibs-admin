import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// React Table
import { CheckBox } from '@material-ui/icons';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, Paper } from '@material-ui/core';
import TablePaginationActions from "../../../../helpers/TablePagination";
import TableSearch from "../../tableSearch";
// REDUX
import { connect } from 'react-redux';
import { getDebits } from '../../../../actions/debits';

const columns = [
  { id: 'status', label: 'Estado', minWidth: 100 },
  { id: 'user', label: 'Usuario', minWidth: 150 },
  { id: 'cedula', label: 'Cédula', minWidth: 100 },
  { id: 'bank_name', label: 'Banco', minWidth: 150 },
  { id: 'debit_type', label: 'Tipo de pago', minWidth: 150 },
  { id: 'date_issued', label: 'Fecha de creación', minWidth: 160 },
  { id: 'fee_amount', label: 'Monto', minWidth: 100 },
  { id: 'start_payment_date', label: 'Fecha de inicio', minWidth: 160 },
  { id: 'supplier_name', label: 'Empresa', minWidth: 160 },
  { id: 'actions', label: 'Acciones', minWidth: 150 }
]

const SuccessDebitsTable = ({ getDebits, debits, loading }) => {
  useEffect(() => {
    getDebits('success');
  }, [getDebits]);
  
  const [filteredDebits, setFilteredDebits] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, debits ? debits.length : 0 - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const setFilter = data => setFilteredDebits(data);

  return (
    <>
      <section className="content-header">
        <div className="section-title">
          <h2 className="font-weight-bold">Domiciliaciones procesadas</h2>
          <button className={`btn btn-primary ld-ext-right ${loading && 'running'}`}
            onClick={() => getDebits('success')} disabled={loading}
          >
            Actualizar
            <div className="ld ld-ring ld-spin"/>
          </button>
        </div>
        <TableSearch setFilter={setFilter} payments={debits} />
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
                {(!filteredDebits ? debits : filteredDebits).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(debit => (
                  <TableRow hover key={debit.id} role="checkbox" tabIndex={-1}>
                    <TableCell className={'status ' + debit.status.name}>
                      {debit.status.name}
                    </TableCell>
                    <TableCell>{debit.user.firstName + ' ' + debit.user.lastName}</TableCell>
                    <TableCell>{debit.user.cedula}</TableCell>
                    <TableCell>{debit.bankName}</TableCell>
                    <TableCell>{debit.debitType}</TableCell>
                    <TableCell>
                      <Moment format="DD/MM/YYYY hh:mm a">{debit.createdAt}</Moment>
                    </TableCell>
                    <TableCell>
                      {Number(debit.feeAmount).toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} Bs.
                    </TableCell>
                    <TableCell>
                      <Moment format='DD/MM/YYYY hh:mm a'>{debit.startPaymentDate}</Moment>
                    </TableCell>
                    <TableCell>{debit.supplier.name}</TableCell>      
                    <TableCell align="center" className="tableCell-actions">
                      <Link className="table-button" to={`/users-direct-debits/detail/${debit.id}`}> 
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
                  count={debits.length}
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
  getDebits: PropTypes.func.isRequired,
  debits: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    debits: state.debits.debits,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps, { getDebits })(SuccessDebitsTable);