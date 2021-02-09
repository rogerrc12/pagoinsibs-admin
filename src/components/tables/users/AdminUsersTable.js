import React from "react";
import Table from "../../UI/tables/Table";
import { AddBox, EditRounded } from "@material-ui/icons";
import moment from "moment";

const AdminUsersTable = (props) => {
  const data = {
    columns: [
      { field: "name", title: "Nombre" },
      { field: "cedula", title: "Cédula" },
      { field: "email", title: "Correo electrónico" },
      { field: "userRole", title: "Rol de usuario" },
      { field: "since", title: "Usuario desde" },
    ],
    rows: [],
  };

  if (props.data.length > 0) {
    data.rows = props.data.map((user) => ({
      id: user.id,
      name: user.firstName + " " + user.lastName,
      cedula: user.cedula,
      email: user.email,
      userRole: user.role.roleName,
      userRoleId: user.role.id,
      since: moment(user.createdAt).format("DD/MM/YYYY"),
    }));
  }

  return (
    <Table
      columns={data.columns}
      data={data.rows}
      isLoading={props.isLoading}
      localization={{
        body: {
          emptyDataSourceMessage: "No hay usuarios agregados.",
        },
      }}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        { icon: () => <AddBox color='primary' fontSize='large' />, isFreeAction: true, onClick: () => props.addUser() },
        { icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => props.editUser(rowData.id) },
      ]}
    />
  );
};

export default AdminUsersTable;
