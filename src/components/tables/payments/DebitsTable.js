import React from "react";
import Table from "../../UI/tables/Table";
import { CheckBox, Tune } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { RotateLeft, SaveAltOutlined } from "@material-ui/icons";
import { formatAmount } from "../../../helpers/functions";
import moment from "moment";

const DebitsTable = (props) => {
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
        field: "cedula",
        title: "Cédula",
      },
      {
        field: props.type === "dolares" ? "paymentType" : "bankName",
        title: props.type === "dolares" ? "tipo de pago" : "Banco",
      },
      {
        field: "debitType",
        title: "Forma de descuento",
      },
      {
        field: "feeAmount",
        title: "Monto de cuota",
      },
      {
        field: "InitialDate",
        title: "Fecha de cobro",
      },
      {
        field: "company",
        title: "Empresa",
      },
      {
        field: "actions",
        title: "Acciones",
        render: (rowData) => (
          <Link className='table-button' to={`/debits/details/${rowData.debitId}`}>
            Ver detalles
            <CheckBox color='action' />
          </Link>
        ),
      },
    ],
    rows: props.data.map((debit) => ({
      debitId: debit.id,
      status: debit.status.name,
      user: debit.user.firstName + " " + debit.user.lastName,
      cedula: debit.user.cedula,
      bankName: debit.bankName,
      paymentType: debit.paymentType,
      debitType: debit.debitType,
      feeAmount: debit.currency.symbol + " " + formatAmount(debit.feeAmount),
      InitialDate: moment(debit.startPaymentDate).format("DD/MM/YYYY"),
      company: debit.supplier.name,
    })),
  };

  const actions = [{ icon: () => <RotateLeft color='primary' fontSize='large' />, isFreeAction: Tune, onClick: () => props.getDebits("pending") }];

  if (props.type === "bolivares" && props.tableType === "pending") {
    actions.push({ icon: () => <SaveAltOutlined color='primary' fontSize='large' />, isFreeAction: Tune, onClick: () => props.processDebits(props.data) });
  }

  return <Table options={{ search: true }} title={props.title} columns={data.columns} data={data.rows} actions={actions} />;
};

export default React.memo(DebitsTable);
