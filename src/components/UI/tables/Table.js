import React from "react";
import MaterialTable from "material-table";

const NormalTable = (props) => {
  return (
    <MaterialTable
      columns={props.columns}
      data={props.data}
      options={props.options}
      title={props.title}
      actions={props.actions}
      localization={{
        toolbar: { searchPlaceholder: "Buscar" },
        pagination: { labelRowsSelect: "entradas", labelDisplayedRows: "{from}-{to} de {count}" },
        header: { actions: "Acciones" },
      }}
    />
  );
};

export default NormalTable;
