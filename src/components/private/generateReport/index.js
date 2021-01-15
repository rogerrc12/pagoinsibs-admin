import React from "react";
import ReportForm from "./GenerateReport";
import { connect } from "react-redux";
import * as activityActions from "../../../store/actions/activity";

const GenerateReport = (props) => {
  return (
    <section className='content'>
      <div className='generate-report'>
        <h1>Generar reporte</h1>
        <ReportForm banks={props.banks} suppliers={props.suppliers} generateReport={props.generateReport} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    banks: state.activity.banks,
    suppliers: state.suppliers.suppliers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateReport: (values) => dispatch(activityActions.generateReport(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateReport);
