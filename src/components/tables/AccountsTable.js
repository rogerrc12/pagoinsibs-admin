import React from "react";
import Table from "../UI/tables/Table";

const columns = [
  { title: "Nombre del banco", field: "bankName" },
  { title: "Número de cuenta", field: "accNumber" },
  { title: "Tipo de cuenta", field: "accType" },
];

const AccountsTable = (props) => {
  let data = [];

  if (props.data.length > 0) {
    data = props.data.map((account) => ({
      id: account.id,
      bankName: account.bank.bankName,
      accNumber: account.accNumber,
      accType: account.accType,
    }));
  }

  return (
    <Table
      title={props.title}
      columns={columns}
      data={data}
      actions={props.actions}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default AccountsTable;
