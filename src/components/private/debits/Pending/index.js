import React, { useEffect } from "react";
import PendingDebitsTable from "./tables/Pending";
import ProcessingDebitsTable from "./tables/Processing";
// REDUX
import { connect } from "react-redux";
import { getDebits } from "../../../../store/actions/debits";

const DebitsPending = ({ getDebits, debits }) => {
  useEffect(() => {
    getDebits("pending");
  }, [getDebits]);

  const pendingDebits = debits.filter((debit) => debit.statusId !== 2);
  const processingDebits = debits.filter((debit) => debit.statusId === 2);

  return (
    <>
      <PendingDebitsTable debits={pendingDebits} getDebits={getDebits} />
      <ProcessingDebitsTable debits={processingDebits} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    debits: state.debits.pending_debits,
  };
};

export default connect(mapStateToProps, { getDebits })(DebitsPending);
