import React from "react";
import Table from "../UI/tables/Table";
import { SupervisedUserCircle, AddBox, EditRounded, DeleteForever } from "@material-ui/icons";

const SuppliersTable = (props) => {
  let data = [];

  if (props.data.length > 0) {
    data = props.data.map((supplier) => ({
      id: supplier.id,
      name: supplier.name,
      rif: supplier.rif,
      address: supplier.address,
      managerName: supplier.managerFirstName + " " + supplier.managerLastName,
      contactInfo: (
        <span>
          {supplier.localPhone} <br /> {supplier.mobilePhone}
        </span>
      ),
    }));
  }

  return (
    <Table
      options={{ search: true, actionsColumnIndex: -1 }}
      title='Empresas Afiliadas'
      columns={props.columns}
      data={data}
      actions={[
        { icon: () => <AddBox color='primary' fontSize='large' />, isFreeAction: true, onClick: () => props.add() },
        { icon: () => <SupervisedUserCircle fontSize='large' style={{ color: "#5cb85c" }} />, onClick: (e, rowData) => props.view(rowData.id) },
        { icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => props.edit(rowData.id) },
        { icon: () => <DeleteForever fontSize='large' style={{ color: "#d9534f" }} />, onClick: (e, rowData) => props.delete(rowData) },
      ]}
    />
  );
};

export default SuppliersTable;
