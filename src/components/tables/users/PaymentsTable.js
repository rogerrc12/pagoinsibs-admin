import React from "react";
import Table from "../../UI/tables/Table";
import { formatAmount } from "../../../helpers/functions";
import moment from "moment";

const PaymentsTable = (props) => {
  const data = {
    columns: [
      {
        field: "status",
        title: "Estado",
        render: (rowData) => <div className={"status " + rowData.status}>{rowData.status}</div>,
      },
      {
        field: "paymentType",
        title: "tipo de pago",
      },
      {
        field: "bankName",
        title: "Banco",
      },
      {
        field: "amount",
        title: "Monto",
      },
      {
        field: "InitialDate",
        title: "Inicio de cobro",
      },
      {
        field: "company",
        title: "Empresa",
      },
    ],
    rows: [],
  };

  if (props.data.length > 0) {
    data.rows = props.data.map((payment) => ({
      status: payment.status.name,
      bankName: payment.bankName || "sin banco",
      paymentType: payment.paymentType,
      amount: payment.currency.symbol + " " + formatAmount(payment.amount),
      InitialDate: moment(payment.startPaymentDate).format("DD/MM/YYYY"),
      company: payment.supplier.name,
    }));
  }

  return <Table options={{ search: true }} title={props.title} columns={data.columns} data={data.rows} />;
};

export default React.memo(PaymentsTable);
