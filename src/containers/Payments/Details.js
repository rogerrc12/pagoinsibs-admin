import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatAmount } from "../../helpers/functions";
import Moment from "react-moment";
// REDUX
import { connect } from "react-redux";
import { processPaymentInit, getPaymentDetailsInit, cancelPaymentInit } from "../../store/actions";

const PaymentDetail = ({ getPaymentDetailsInit, processPaymentInit, cancelPaymentInit, detail, match, processing }) => {
  const { paymentId } = match.params;

  useEffect(() => {
    getPaymentDetailsInit(paymentId);
  }, [getPaymentDetailsInit, paymentId]);

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
              {detail.paymentType !== "account" ? (
                <>
                  <strong>Forma de pago:</strong>
                  <br />
                  {detail.paymentType}
                </>
              ) : (
                <>
                  <strong>Cuenta a debitar:</strong>
                  <br />
                  {detail.bankName}
                  <br />
                  {detail.accNumber}
                  <br />
                  {detail.accType}
                  <br />
                </>
              )}
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
            <b>Monto:</b> {formatAmount(detail.amount) + " " + detail.currency.symbol}
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
        <div className='row no-print' style={{ marginTop: 40 }}>
          <div className='col-xs-12'>
            <button
              type='button'
              className={`btn btn-danger pull-right ld-ext-right ${processing ? "running" : ""}`}
              disabled={(detail.status.name !== "pendiente" && detail.status.name !== "procesando") || processing}
              onClick={cancelPaymentInit.bind(this, detail.id)}
            >
              <i className='fa fa-times' /> Cancelar
              <div className='ld ld-ring ld-spin' />
            </button>
            <button
              type='button'
              className={`btn btn-success pull-right ld-ext-right ${processing ? "running" : ""}`}
              style={{ marginRight: "5px" }}
              onClick={processPaymentInit.bind(this, detail.id)}
              disabled={detail.status.name !== "pendiente" || processing}
            >
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
};

const mapStateToProps = (state) => ({
  detail: state.payments.paymentDetails,
  processing: state.payments.processing,
});

export default connect(mapStateToProps, { getPaymentDetailsInit, processPaymentInit, cancelPaymentInit })(PaymentDetail);
