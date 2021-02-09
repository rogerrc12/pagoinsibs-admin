import React, { useEffect } from "react";
import DebitsTable from "../../components/tables/payments/DebitsTable";
// REDUX
import { connect } from "react-redux";
import { getDebitsInit } from "../../store/actions";

const PendingDebits = ({ getDebitsInit, debits, match }) => {
  useEffect(() => {
    getDebitsInit();
  }, [getDebitsInit]);

  const { currencyType } = match.params;
  const { allDebits } = debits;

  const dolaresDebits = allDebits.filter((debit) => debit.currencyId === 2);
  const bolivaresDebits = allDebits.filter((debit) => debit.currencyId === 1);

  return (
    <>
      <section className='content-header'>
        <div className='section-title'>
          <h2>Domiciliaciones en dólares</h2>
        </div>
      </section>
      <section className='content'>
        <DebitsTable title='Domiciliaciones' type={currencyType} data={dolaresDebits} />
      </section>

      <section className='content-header'>
        <div className='section-title'>
          <h2>Domiciliaciones en bolívares</h2>
        </div>
      </section>
      <section className='content'>
        <DebitsTable title='Domiciliaciones' type={currencyType} data={bolivaresDebits} />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    debits: state.debits,
  };
};

export default connect(mapStateToProps, { getDebitsInit })(PendingDebits);
