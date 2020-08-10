import React, { useEffect } from 'react';
import PendingPaymentsTable from './Tables/Pending';
import ProcessingPaymentsTable from './Tables/Processing';
// REDUX
import { connect } from 'react-redux';
import { getPayments } from '../../../../actions/payments';

const ProcessingPayments = ({ getPayments, payments }) => {
  useEffect(() => {
    getPayments('pending');
  }, [getPayments]);

  const pendingPayments = payments.filter(payment => payment.statusId !== 2);
  const processingPayments = payments.filter(payment => payment.statusId === 2);
  
  return (
    <>
      <PendingPaymentsTable getPayments={getPayments} payments={pendingPayments} />
      <ProcessingPaymentsTable payments={processingPayments} />
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments.pending_acc_payments
  }
}

export default connect(mapStateToProps, { getPayments })(ProcessingPayments);
