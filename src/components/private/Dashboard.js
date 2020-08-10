import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// connect
import { connect } from 'react-redux';
import { getPaymentsCount } from '../../actions/payments';
import { getDebitsCount } from '../../actions/debits';


const Dashboard = ({ getPaymentsCount, getDebitsCount, payments, debits }) => {

  // get acc payments count
  useEffect(() => {
    getPaymentsCount();
  }, [getPaymentsCount]);

  // get direct debits count
  useEffect(() => {
    getDebitsCount();
  }, [getDebitsCount]);

  return (
    <section className="content">
      <div className="row">
        <div className="col-lg-4 col-xs-6">
          {/* small box */}
          <div className="small-box bg-green">
            <div className="inner">
            <h3>{payments}</h3>
              <p>Pagos recibidos</p>
            </div>
            <div className="icon">
              <ion-icon name="card-outline"/>
            </div>
            <Link to="/users-payments" className="small-box-footer">Ver procesados <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-4 col-xs-6">
          {/* small box */}
          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>44</h3>
              <p>Usuarios registrados</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link to="/users" className="small-box-footer">Ver todos <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-4 col-xs-6">
          {/* small box */}
          <div className="small-box bg-red">
            <div className="inner">
              <h3>{debits}</h3>
              <p>Domiciliaciones recibidas</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <Link to="/direct-debits" className="small-box-footer">Ver procesadas <i className="fa fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
      </div>

    </section>
  )
}

Dashboard.propTypes = {
  getPaymentsCount: PropTypes.func.isRequired,
  getDebitsCount: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
  payments: PropTypes.number.isRequired,
  debits: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    activity: state.activity,
    loading: state.loading.loading,
    payments: state.payments.payments_count,
    debits: state.debits.debits_count
  }
}

export default connect(mapStateToProps, { getPaymentsCount, getDebitsCount })(Dashboard);