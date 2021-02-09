import React, { useEffect } from "react";
// REDUX
import { connect } from "react-redux";
import { getPaymentsInit } from "../../store/actions";

import PaymentsTable from "../../components/tables/payments/PaymentsTable";

const PendingPayments = ({ getPaymentsInit, payments }) => {
  useEffect(() => {
    getPaymentsInit();
  }, [getPaymentsInit]);

  const dolaresPayments = payments.filter((payment) => payment.currencyId === 2);
  const bolivaresPayments = payments.filter((payment) => payment.currencyId === 1);

  return (
    <>
      <section className='content-header'>
        <div className='section-title'>
          <h2>Pagos en bolívares</h2>
        </div>
      </section>
      <section className='content'>
        <PaymentsTable title='Todos los pagos' type='bolivares' data={bolivaresPayments} />
      </section>

      <section className='content-header'>
        <div className='section-title'>
          <h2>Pagos en dólares</h2>
        </div>
      </section>
      <section className='content'>
        <PaymentsTable title='Todos los pagos' type='dolares' data={dolaresPayments} />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments.allPayments,
  };
};

export default connect(mapStateToProps, { getPaymentsInit })(PendingPayments);
