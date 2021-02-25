import React, { useEffect } from "react";
import { Alert } from "@material-ui/lab";
// REDUX
import { connect } from "react-redux";
import { getDebitsInit, processBulkDebitsInit } from "../../store/actions";

import DebitsTable from "../../components/tables/payments/DebitsTable";

const PendingDebits = ({ getDebitsInit, processBulkDebitsInit, debits, match }) => {
  useEffect(() => {
    getDebitsInit("pending");
  }, [getDebitsInit]);

  const { currencyType } = match.params;
  const { pendingDebits, processingDebits, error } = debits;

  let pendingDebitsList = pendingDebits.filter((debit) => (currencyType === "dolares" ? debit.currencyId === 1 : debit.currencyId === 2));
  let processingDebitsList = processingDebits.filter((debit) => (currencyType === "dolares" ? debit.currencyId === 1 : debit.currencyId === 2));

  return (
    <>
      <section className='content-header'>
        <div className='section-title'>
          <h2>Domiciliaciones Pendientes</h2>
        </div>
      </section>
      <section className='content'>
        <DebitsTable title='Pendientes' getDebits={getDebitsInit} processDebits={processBulkDebitsInit} tableType='pending' type={currencyType} data={pendingDebitsList} />
      </section>

      <section className='content-header'>
        <div className='section-title'>
          <h2>Domiciliaciones Procesandose</h2>
        </div>
      </section>
      <section className='content'>
        <DebitsTable title='Procesandose' getDebits={getDebitsInit} type={currencyType} data={processingDebitsList} />
      </section>
      {error && (
        <Alert severity='error' className='Alert' variant='filled'>
          {error}
        </Alert>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    debits: state.debits,
  };
};

export default connect(mapStateToProps, { getDebitsInit, processBulkDebitsInit })(PendingDebits);
