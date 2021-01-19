import React from "react";
import Table from "../UI/tables/Table";
import { formatAmount } from "../../helpers/functions";

const CurrenciesTable = (props) => {
  const data =
    props.data.length > 0
      ? props.data.map((currency) => ({
          id: currency.id,
          name: currency.name,
          ISO: currency.ISO,
          symbol: currency.symbol,
          buyPrice: formatAmount(currency.buyPrice),
          sellPrice: formatAmount(currency.sellPrice),
        }))
      : [];

  return <Table columns={props.columns} data={data} options={{ search: false, actionsColumnIndex: -1 }} actions={props.actions} />;
};

export default CurrenciesTable;
