import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { formatAmount } from "../../../../../helpers/functions";
// MATERIAL TABLE
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Edit, DeleteForever } from "@material-ui/icons";
// REDUX
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
});

const Suppliers = (props) => {
  const { products, getProducts, deleteProduct } = props;
  const { id } = props.match.params;

  useEffect(() => {
    getProducts(id);
  }, [getProducts, id]);

  const classes = useStyles();

  return (
    <>
      <div className='row'>
        <div className='col-xs-12'>
          <h2 className='page-header'>
            <i className='fa fa-archive' /> Productos asociados
            <Link to={`/suppliers/products/add/${id}`} className='btn btn-primary pull-right'>
              <i className='fa fa-plus'></i> Agregar producto
            </Link>
          </h2>
        </div>
      </div>

      <div className='row'>
        <div className='col-xs-12 table-responsive'>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label='Comercios afiliados'>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre del producto</TableCell>
                  <TableCell>Monto del producto (sin interés)</TableCell>
                  <TableCell>Monto del producto (con interés)</TableCell>
                  <TableCell>Tasa de interés</TableCell>
                  <TableCell>Meses de domiciliación</TableCell>
                  <TableCell align='center'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='products-table'>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component='th' scope='row'>
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {formatAmount(product.amount)} {product.currency.symbol}
                    </TableCell>
                    <TableCell>
                      {formatAmount(Number(product.amount) * (Number(product.interestRate) + 1))} {product.currency.symbol}
                    </TableCell>
                    <TableCell align='center'>{Number(product.interestRate) * 100}%</TableCell>
                    <TableCell align='center'>{product.maxDebitMonths}</TableCell>
                    <TableCell className='tableCell-actions' align='center'>
                      <Link to={`/suppliers/products/edit/${id}/${product.id}`} className='table-button profile'>
                        Editar <Edit color='action' fontSize='large' />
                      </Link>
                      <button className='table-button delete' onClick={deleteProduct.bind(this, id, product.id)}>
                        Eliminar <DeleteForever color='action' fontSize='large' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    </>
  );
};

Suppliers.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    products: state.suppliers.products,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (supplierId) => dispatch(actions.getProductsInit(supplierId)),
  deleteProduct: (supplierId, productId) => dispatch(actions.deleteProductInit(supplierId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Suppliers));
