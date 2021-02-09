import React from "react";
import Table from "../../UI/tables/Table";
import { Visibility } from "@material-ui/icons";
import moment from "moment";

const AdminUsersTable = (props) => {
  const data = {
    columns: [
      { field: "name", title: "Nombre" },
      { field: "cedula", title: "Cédula" },
      { field: "email", title: "Correo electrónico" },
      { field: "since", title: "Usuario desde" },
    ],
    rows: [],
  };

  if (props.data.length > 0) {
    data.rows = props.data.map((subscriber) => ({
      id: subscriber.id,
      name: subscriber.firstName + " " + subscriber.lastName,
      cedula: subscriber.cedula,
      email: subscriber.email,
      since: moment(subscriber.createdAt).format("DD/MM/YYYY"),
    }));
  }

  return (
    <Table
      columns={data.columns}
      data={data.rows}
      isLoading={props.isLoading}
      localization={{
        body: {
          emptyDataSourceMessage: "No hay usuarios registrados.",
        },
      }}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        {
          icon: () => <Visibility color='primary' fontSize='large' />,
          onClick: (e, rowData) => props.showUser(rowData.id),
        },
      ]}
    />
  );
};

export default AdminUsersTable;
