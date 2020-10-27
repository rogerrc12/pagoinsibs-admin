import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import CurrenciesTable from "../../components/tables/CurrenciesTable";
import AddCurrency from "./AddCurrencies";

const Currencies = (props) => {
  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Monedas disponibles</h2>
        <Link to={props.match.url + "/add"} className='btn btn-primary'>
          <i className='fa fa-plus' /> Agregar moneda
        </Link>
      </section>
      <section className='content'>
        <CurrenciesTable currencies={props.currencies} />
      </section>

      <Route path={props.match.url + "/add"} component={AddCurrency} />
    </>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.activity.currencies,
});

export default connect(mapStateToProps)(Currencies);
