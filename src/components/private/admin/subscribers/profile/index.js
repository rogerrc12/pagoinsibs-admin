import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// MATERIAL TABLE
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TablePaginationActions from "../../../../../helpers/TablePagination";
// REDUX
import { connect } from 'react-redux';
import { getProfile } from '../../../../../actions/users';

const Profile = ({ getProfile, match, profile }) => {
  const { id } = match.params;
  const { information, payments, accounts } = profile;

  useLayoutEffect(() => {
    getProfile(id);
  }, [id, getProfile])

  // Handle TableCell Material UI
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, payments.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className="content">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-6">
          <div className="box box-primary text-center">
            <div className="box-body box-profile">
              <span className="fa fa-user-circle-o fa-5x"></span>

              <h3 className="profile-username ">
                {information.firstName + ' ' + information.lastName}
              </h3>

              <p className="text-uppercase"><b>Información:</b></p>
                <p><b>Cédula:</b> {information.cedula}</p>
                <p><b>Email:</b> {information.email}</p>
            </div>
          </div>
        </div>
      </div>
      <section className="invoice">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="page-header">
              <i className="fa fa-university" /> Cuentas bancarias
            </h2>
          </div>
          {/* /.col */}
        </div>
        <div className="row">
          <div className="col-xs-12 table-responsive">
            <Table aria-label="Cuentas bancarias">
              <TableHead>
                <TableRow>
                  <TableCell>Banco</TableCell>
                  <TableCell align="right">Número de cuenta</TableCell>
                  <TableCell align="right">Tipo de cuenta</TableCell>
                  <TableCell align="right">Para enviar</TableCell>
                  <TableCell align="right">Para recibir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map(account => (
                  <TableRow key={account.id}>
                    <TableCell component="th" scope="row">
                      {account.bank.bankName}
                    </TableCell>
                    <TableCell align="right">{account.accNumber}</TableCell>
                    <TableCell align="right">{account.accType}</TableCell>
                    <TableCell align="right">
                      <span className="badge badge-success">{account.toSend && 'enviar'}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="badge badge-success">{account.toReceive && 'recibir'}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      
      <section className="invoice">
        {/* title row */}
        <div className="row">
          <div className="col-xs-12">
            <h2 className="page-header">
              <i className="fa fa-address-card" /> {information.firstName + ' ' + information.lastName}
              <small className="pull-right">Transacciones realizadas</small>
            </h2>
          </div>
          {/* /.col */}
        </div>
        {/* Table row */}
        <div className="row">
          <div className="col-xs-12 table-responsive">
            <Table className="table table-striped" aria-label="custom pagination table">
              <TableBody>
                {payments.map(transaction => (
                  <TableRow key={transaction.createdAt}>
                    <TableCell component="th" scope="row">
                      {transaction.id}
                    </TableCell>
                    <TableCell align="left">{transaction.description}</TableCell>
                    <TableCell align="left">{
                      transaction.firstName
                      ?
                      `${transaction.firstName} ${transaction.lastName} (${transaction.username})`
                      :
                      transaction.name
                    }</TableCell>
                    <TableCell align="left">{
                      Number(transaction.amount).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs.'
                    }</TableCell>
                    <TableCell align="right">
                      <Moment format="DD/MM/YYYY hh:mm a">
                        {transaction.createdAt}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <span className={`status ${transaction.status.name}`}>{transaction.status.name}</span>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={6}
                    count={payments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'entradas por página' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    labelRowsPerPage="Entradas por página"
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        <div className="row">
          {/* Total amount of payment */}
          <div className="col-xs-6">
            <p className="lead">Total en movimientos:</p>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Total:</th>
                    <td>{Number(payments.reduce((prev, cur) => {
                      return prev + parseFloat(cur.amount)}, 0)).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs.'
                    }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        <div className="row no-print">
          <div className="col-xs-12">
            <button type="button" className="btn btn-primary pull-right" style={{marginRight: 5}}>
              <i className="fa fa-download" /> Generar PDF
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    profile: state.users.profile
  }
}

export default connect(mapStateToProps, { getProfile })(Profile);
