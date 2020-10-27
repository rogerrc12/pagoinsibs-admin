import React from "react";
import MaterialTable from "material-table";

const SearchTable = (props) => {
  return <MaterialTable columns={props.columns} data={props.data} options={{ search: true }} title={props.title} actions={props.actions} />;
};

export default SearchTable;
