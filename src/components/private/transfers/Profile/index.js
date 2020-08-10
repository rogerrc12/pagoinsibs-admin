import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// REACT TABLE
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// REDUX
import { connect } from 'react-redux';
import { getBasicProfile } from '../../../../actions/users';

const ReceiverProfile = withRouter(({ getBasicProfile, match, profile }) => {
  const { id } = match.params;
  const { information, bank_accounts: { to_receive } } = profile;


  useEffect(() => {
    getBasicProfile(id);
  }, [getBasicProfile, id])

  return (
    <section className="content">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-8">
          <div className="box box-primary text-center">
            <div className="box-body box-profile">
              <span className="fa fa-user-circle-o fa-5x"></span>

              <h3 className="profile-username">{information.first_name + ' ' + information.last_name}</h3>
              <p className="text-muted">{information.pay_id}</p>

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
            <i className="fa fa-university" /> Cuenta bancarias
            <small className="pull-right">Cuentas registradas para recibir</small>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {to_receive && to_receive.map(account => (
                  <TableRow key={account.id}>
                    <TableCell component="th" scope="row">
                      {account.bank_name}
                    </TableCell>
                    <TableCell align="right">{account.acc_number}</TableCell>
                    <TableCell align="right">{account.acc_type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </section>
  )
})

const mapStateToProps = state => {
  return {
    profile: state.users.profile
  }
}

export default connect(mapStateToProps, { getBasicProfile })(ReceiverProfile);
