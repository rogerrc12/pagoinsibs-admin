import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import history from "../../helpers/history";
import { EditRounded } from "@material-ui/icons";

import ProductsTable from "../../components/tables/ProductsTable";

const Products = (props) => {
  const { getProducts, products } = props;

  const onePaymentColumns = [
    { title: "Nombre", field: "name" },
    { title: "Monto", field: "amount" },
    { title: "Multimoneda", field: "currencyConversion" },
    { title: "Empresa", field: "supplier" },
  ];

  const directDebitColumns = [
    { title: "Nombre", field: "name" },
    { title: "Monto", field: "amount" },
    { title: "Empresa", field: "supplier" },
    { title: "Multimoneda", field: "currencyConversion" },
    { title: "Tasa de interes", field: "interestRate" },
    { title: "Meses de domiciliación", field: "maxDebitMonths" },
  ];

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const editProduct = (id) => history.push(`${props.match.url}/edit/${id}`);

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Productos para pago único</h2>
      </section>
      <section className='content'>
        <ProductsTable
          columns={onePaymentColumns}
          data={products.onePaymentProducts}
          type='onePayment'
          title='Productos (Pago único)'
          actions={[{ icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => editProduct(rowData.id) }]}
        />
      </section>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Productos para domiciliar</h2>
      </section>
      <section className='content'>
        <ProductsTable
          columns={directDebitColumns}
          edit={editProduct}
          data={products.directDebitProducts}
          type='directDebit'
          title='Productos (Domiciliar)'
          actions={[{ icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => editProduct(rowData.id) }]}
        />
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(actions.getProductsInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
