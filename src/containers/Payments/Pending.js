import React, { useEffect } from "react";
import { Alert } from "@material-ui/lab";
// REDUX
import { connect } from "react-redux";
import { getPaymentsInit, processBulkPaymentsInit } from "../../store/actions";

import PaymentsTable from "../../components/tables/payments/PaymentsTable";

const PendingPayments = ({ getPaymentsInit, processBulkPaymentsInit, payments, match }) => {
  useEffect(() => {
    getPaymentsInit("pending");
  }, [getPaymentsInit]);

  const { currencyType } = match.params;
  const { pendingPayments, processingPayments, error } = payments;

  let pendingPaymentsList = pendingPayments.filter((payment) => (currencyType === "dolares" ? payment.currencyId === 1 : payment.currencyId === 2));
  let processingPaymentsList = processingPayments.filter((payment) => (currencyType === "dolares" ? payment.currencyId === 1 : payment.currencyId === 2));

  return (
    <>
      <section className="content-header">
        <div className="section-title">
          <h2>Pagos Pendientes</h2>
        </div>
      </section>
      <section className="content">
        <PaymentsTable
          title="Pendientes"
          getPayments={getPaymentsInit}
          processPayments={processBulkPaymentsInit}
          tableType="pending"
          type={currencyType}
          data={pendingPaymentsList}
        />
      </section>

      <section className="content-header">
        <div className="section-title">
          <h2>Pagos Procesandose</h2>
        </div>
      </section>
      <section className="content">
        <PaymentsTable title="Procesandose" getPayments={getPaymentsInit} type={currencyType} data={processingPaymentsList} />
      </section>
      {error && (
        <Alert severity="error" className="Alert" variant="filled">
          {error}
        </Alert>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments,
  };
};

export default connect(mapStateToProps, { getPaymentsInit, processBulkPaymentsInit })(PendingPayments);
