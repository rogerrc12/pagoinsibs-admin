import React from "react";
import { Route } from "react-router-dom";
import { EditRounded } from "@material-ui/icons";
import { connect } from "react-redux";
import history from "../../helpers/history";

import CurrenciesTable from "../../components/tables/CurrenciesTable";
import EditCurrency from "./EditCurrency";

const columns = [
  { title: "Moneda", field: "name" },
  { title: "Código ISO", field: "ISO" },
  { title: "Símbolo", field: "symbol" },
  { title: "Tasa compra", field: "buyPrice" },
  { title: "Tasa venta", field: "sellPrice" },
];

const Currencies = (props) => {
  const editCurrency = (id) => history.push(props.match.url + "/edit/" + id);

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Monedas disponibles</h2>
      </section>
      <section className='content'>
        <CurrenciesTable
          columns={columns}
          data={props.currencies}
          actions={[{ icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => editCurrency(rowData.id) }]}
        />
      </section>

      <Route path={props.match.url + "/edit/:currencyId"} component={EditCurrency} />
    </>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.activity.currencies,
});

export default connect(mapStateToProps)(Currencies);
