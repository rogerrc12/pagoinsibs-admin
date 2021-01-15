import React from "react";
import Table from "../UI/tables/Table";
import { CheckBox, Tune } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { RotateLeft, SaveAltOutlined } from "@material-ui/icons";
import { formatAmount } from "../../helpers/functions";
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
        field: "user",
        title: "Usuario",
      },
      {
        field: props.type === "dolares" ? "paymentType" : "bankName",
        title: props.type === "dolares" ? "tipo de pago" : "Banco",
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
      {
        field: "actions",
        title: "Acciones",
        render: (rowData) => (
          <Link className='table-button' to={`/payments/details/${rowData.paymentId}`}>
            Ver detalles
            <CheckBox color='action' fontSize='large' />
          </Link>
        ),
      },
    ],
    rows: props.data.map((payment) => ({
      paymentId: payment.id,
      status: payment.status.name,
      user: payment.user.firstName + " " + payment.user.lastName,
      bankName: payment.bankName,
      paymentType: payment.paymentType,
      amount: payment.currency.symbol + " " + formatAmount(payment.amount),
      InitialDate: moment(payment.startPaymentDate).format("DD/MM/YYYY"),
      company: payment.supplier.name,
    })),
  };

  const actions = [{ icon: () => <RotateLeft color='primary' fontSize='large' />, isFreeAction: Tune, onClick: () => props.getPayments("pending") }];

  if (props.tableType === "pending" && props.type === "bolivares") {
    actions.push({ icon: () => <SaveAltOutlined color='primary' fontSize='large' />, isFreeAction: Tune, onClick: () => props.processPayments(props.data) });
  }

  return <Table options={{ search: true }} title={props.title} columns={data.columns} data={data.rows} actions={actions} />;
};

export default React.memo(PaymentsTable);
