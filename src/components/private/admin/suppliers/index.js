import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../../../layout/Alert';
// MATERIAL TABLE
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableFooter, TablePagination } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';
import TablePaginationActions from "../../../../helpers/TablePagination";
// REDUX
import { connect } from 'react-redux';
import { getSuppliers, deleteSupplier } from '../../../../actions/suppliers';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Suppliers = ({ suppliers, getSuppliers, deleteSupplier, match }) => {
  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, suppliers.length - page * rowsPerPage);

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
        <h2 className="font-weight-bold">Comercios Afiliados</h2>
        <Link to={match.url + '/add'} className="btn btn-primary"> <i className="fa fa-plus"/> Agregar comercio</Link>
      </section>
      <section className="content">
        <Paper>
          <Table className={classes.table} aria-label="Comercios afiliados" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del comercio</TableCell>
                <TableCell>RIF</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Engarcado/a</TableCell>
                <TableCell>Teléfonos de contacto</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : suppliers
                ).map(supplier => (
                <TableRow key={supplier.id} id={supplier.id}>
                  <TableCell component="th" scope="row">{supplier.name}</TableCell>
                  <TableCell >{supplier.rif}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.managerFirstName + ' ' + supplier.managerLastName}</TableCell>
                  <TableCell>
                    {supplier.mobilePhone}<br />
                    {supplier.localPhone}
                  </TableCell>
                  <TableCell className="tableCell-actions" align="center">
                    <Link to={match.url + '/profile/' + supplier.id} className="table-button profile">
                      Perfil <Edit color="action" fontSize="large" />
                    </Link>
                    <button className="table-button delete" onClick={() => deleteSupplier(supplier)}>
                      Eliminar <DeleteForever color="action" fontSize="large" />
                    </button>
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
                rowsPerPageOptions={[5, 10]}
                count={suppliers.length}
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
        </Paper>
      </section>
      <Alert />
    </>
  );
}

Suppliers.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  suppliers: PropTypes.array.isRequired,
  deleteSupplier: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers
  }
}

export default connect(mapStateToProps, { getSuppliers, deleteSupplier })(Suppliers);