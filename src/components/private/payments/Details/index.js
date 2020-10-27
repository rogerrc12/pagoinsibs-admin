import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
// REDUX
import { connect } from "react-redux";
import { addPaymentToBank, getAccPaymentDetail } from "../../../../store/actions/payments";

const PaymentDetail = withRouter(({ getAccPaymentDetail, addPaymentToBank, detail, match, loading }) => {
  const { id } = match.params;

  useEffect(() => {
    getAccPaymentDetail(id);
  }, [getAccPaymentDetail, id]);

  const detailList = () =>
    detail.user ? (
      <>
        <div className='row invoice-info'>
          <div className='col-sm-4 invoice-col'>
            Realizado por:
            <address>
              <strong>{`${detail.user.firstName} ${detail.user.lastName}`}</strong>
              <br />
              {detail.user.cedula}
              <br />
              {detail.user.email}
              <br />
              {detail.user.phone}
              <br />
              <br />
              <strong>Cuenta a debitar:</strong>
              <br />
              {detail.bankName}
              <br />
              {detail.accNumber}
              <br />
              {detail.accType}
              <br />
            </address>
          </div>
          <div className='col-sm-4 invoice-col'>
            Empresa que recibe:
            <address>
              <strong>{detail.supplier.name}</strong>
              <br />
              {detail.supplier.rif}
              <br />
              {detail.supplier.email}
            </address>
          </div>
          <div className='col-sm-4 invoice-col'>
            <b>Pago #{detail.id}</b>
            <br />
            <b>Monto:</b> {Number(detail.amount).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.
            <br />
            <b>Descripción:</b> {detail.description}
            <br />
            <br />
            <span className={`status ${detail.status.name}`}>{detail.status.name}</span>
            <br />
            <br />
            <Link className='btn btn-invoice' to={`/suppliers/profile/${detail.supplier.id}`}>
              <i className='fa fa-eye' /> datos de la empresa
            </Link>
          </div>
        </div>
        {/* Incoive buttons */}
        <div className='row no-print'>
          <div className='col-xs-12'>
            <button
              type='button'
              className='btn btn-danger pull-right'
              disabled={detail.status.name !== "pendiente" && detail.status.name !== "procesando"}>
              <i className='fa fa-times' /> Cancelar
            </button>
            <button
              type='button'
              className={`btn btn-success pull-right ld-ext-right ${loading ? "running" : ""}`}
              style={{ marginRight: "5px" }}
              onClick={() => addPaymentToBank(detail.id)}
              disabled={detail.status.name !== "pendiente" || loading}>
              Procesar
              <div className='ld ld-ring ld-spin' />
            </button>
          </div>
        </div>
      </>
    ) : null;

  return (
    <>
      <section className='content-header'>
        <h1>
          Pago
          <small>#{detail.id}</small>
        </h1>
      </section>
      <section className='invoice'>
        {/* Invoice Title */}
        <div className='row'>
          <div className='col-xs-12'>
            <h2 className='page-header'>
              <i className='fa fa-exchange' /> Detalles del pago
              <small className='pull-right'>
                <Moment format='DD/MM/YYYY [a las] hh:mm a'>{detail.createdAt}</Moment>
              </small>
            </h2>
          </div>
        </div>
        {/* Invoice Info */}
        {detailList()}
      </section>
    </>
  );
});

const mapStateToProps = (state) => ({
  detail: state.payments.acc_payment_detail,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { getAccPaymentDetail, addPaymentToBank })(PaymentDetail);
