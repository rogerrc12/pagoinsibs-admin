import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import AddCurrencyForm from "../../components/private/currencies/EditCurrency";

const EditCurrency = (props) => {
  const { currencyData, getCurrency } = props;

  const { currencyId } = props.match.params;

  useEffect(() => {
    if (currencyId) getCurrency(currencyId);
  }, [getCurrency, currencyId]);

  return (
    <>
      <section className='content-header form-header'>
        <h2 className='font-weight-bold'>Editar valores de moneda</h2>
      </section>
      <section className='content'>
        <div className='row form-row'>
          <div className='col-md-6'>
            <div className='box box-primary'>
              <AddCurrencyForm data={currencyData} edit={props.editCurrency} currencyId={currencyId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  currencyData: state.activity.currencyData,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: (currencyId) => dispatch(actions.getCurrencyInit(currencyId)),
  editCurrency: (currencyId, values) => dispatch(actions.editCurrencyInit(currencyId, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCurrency);
