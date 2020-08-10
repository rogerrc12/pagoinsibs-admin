import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../../../../layout/Alert';
import ProductsTable from '../products';
import SupplierPayments from './SupplierPayments';
// MATERIAL TABLE
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// REDUX
import { connect } from 'react-redux';
import { getSupplierProfile } from '../../../../../actions/suppliers';

const SupplierProfile = ({ match, getSupplierProfile, supplierProfile }) => {
  const { id } = match.params;

  useEffect(() => {
    getSupplierProfile(id);
  }, [getSupplierProfile, id]);
  
  const { profile, banks, payments } = supplierProfile;
  
  const banksList = () => {
    return banks.length > 0 ?
      banks.map(account => (
        <TableRow key={account.id}>
          <TableCell component="th" scope="row">
            {account.bank.bankName}
          </TableCell>
          <TableCell align="right">{account.accNumber}</TableCell>
          <TableCell align="right">{account.accType}</TableCell>
        </TableRow>
      )) : null
  }
  
  return (
    <section className="content">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-6">
          <div className="box box-primary">
            <div className="box-body box-profile text-center">
              <span className="fa fa-home fa-5x"/>

              <h3 className="profile-username text-center">
                {profile.name}
              </h3>
              
              <p className="text-muted text-center">RIF: {profile.rif}</p>
              
              <p className="text-uppercase"><b>Dirección:</b></p>
              <p>{profile.address}</p>
              <p className="text-uppercase"><b>Correo Electrónico:</b></p>
              <p>{profile.email}</p>
              <p className="text-uppercase"><b>Persona Encargada:</b></p>
              <p>{profile.managerFirstName + ' ' + profile.managerLastName}</p>
              <p className="text-uppercase"><b>Teléfonos:</b></p>
              <p>
              {profile.mobilePhone}
              <br/>
              {profile.localPhone}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="invoice" style={{ marginBottom: '3rem' }}>
        <ProductsTable />
      </section>

      <section className="invoice">
        
        <div className="row">
          <div className="col-xs-12 content-header">
            <h2 className="page-header">
              <i className="fa fa-university" /> Cuenta bancarias
              <small>Cuentas registradas del comercio</small>
            </h2>
            { banks.length < 4 ?
              <Link to={`/suppliers/add-account/${id}`} className="btn btn-primary">
                <i className="fa fa-plus" /> Agregar cuenta
              </Link> : null }
          </div>
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
                {banksList()}
              </TableBody>
            </Table>
        </div>
        </div>
      
      </section>

      <SupplierPayments payments={payments} />

      <Alert />
    </section>
  )
}

SupplierProfile.propTypes = {
  supplierProfile: PropTypes.object.isRequired,
  getSupplierProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    supplierProfile: state.suppliers.profile
  }
}

export default connect(mapStateToProps, { getSupplierProfile })(SupplierProfile);
