import React from "react";
import Table from "../UI/tables/Table";
import { DoneAll, Clear } from "@material-ui/icons";

import { formatAmount } from "../../helpers/functions";

const ProductsTable = (props) => {
  let data = [];

  if (props.type === "onePayment") {
    data = props.data.map((product) => ({
      id: product.id,
      name: product.name,
      amount: formatAmount(product.amount) + " " + product.currency.symbol,
      currencyConversion: product.currencyConversion ? <DoneAll style={{ color: "#5cb85c" }} fontSize='large' /> : <Clear fontSize='large' style={{ color: "#d9534f" }} />,
      supplier: product.supplier.name,
    }));
  } else if (props.type === "directDebit") {
    data = props.data.map((product) => ({
      id: product.id,
      name: product.name,
      currencyConversion: product.currencyConversion ? <DoneAll style={{ color: "#5cb85c" }} fontSize='large' /> : <Clear fontSize='large' style={{ color: "#d9534f" }} />,
      amount: formatAmount(product.amount) + " " + product.currency.symbol,
      supplier: product.supplier.name,
      interestRate: +product.interestRate * 100 + " %",
      maxDebitMonths: product.maxDebitMonths,
    }));
  } else {
    data = props.data.map((product) => ({
      id: product.id,
      name: product.name,
      amount: formatAmount(product.amount) + " " + product.currency.symbol,
      isDirectDebit: product.isDirectDebit ? <DoneAll style={{ color: "#5cb85c" }} fontSize='large' /> : <Clear fontSize='large' style={{ color: "#d9534f" }} />,
      interestRate: +product.interestRate * 100 + " %",
      maxDebitMonths: product.maxDebitMonths,
    }));
  }

  return (
    <Table
      columns={props.columns}
      data={data}
      title={props.title}
      options={{
        search: true,
        actionsColumnIndex: -1,
      }}
      actions={props.actions}
    />
  );
};

export default ProductsTable;
