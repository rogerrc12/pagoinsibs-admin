import React from "react";
import ProductsTable from "../../components/tables/ProductsTable";

const Products = () => {
  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Productos pago único</h2>
      </section>
      <section className='content'>
        <ProductsTable />
      </section>
    </>
  );
};

export default Products;
