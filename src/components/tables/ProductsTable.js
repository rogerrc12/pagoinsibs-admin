import React from "react";
import SearchTable from "../UI/tables/SearchTable";

const columns = [
  { title: "Nombre", field: "name" },
  { title: "Monto", field: "amount" },
];

const ProductsTable = (props) => {
  const data = [
    { name: "Cuota de mantenimiento", amount: "45000 Bs." },
    { name: "Cuota especial", amount: "75000 $" },
  ];

  return <SearchTable columns={columns} data={data} title='Productos (pago único)' />;
};

export default ProductsTable;
