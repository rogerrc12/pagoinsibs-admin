import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

const NormalTable = (props) => {
  return (
    <MaterialTable
      columns={props.columns}
      data={props.data}
      options={{ loadingType: "overlay", ...props.options }}
      title={props.title || ""}
      isLoading={props.isLoading}
      actions={props.actions}
      localization={{
        toolbar: { searchPlaceholder: "Buscar" },
        pagination: { labelRowsSelect: "entradas", labelDisplayedRows: "{from}-{to} de {count}" },
        header: { actions: "Acciones" },
        ...props.localization,
      }}
    />
  );
};

NormalTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object,
  actions: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default NormalTable;
