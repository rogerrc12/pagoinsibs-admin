import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Cuotas from "./Cuotas";
// REDUX
import { connect } from "react-redux";
import { getDebitDetail, addDebitToBank, cancelDebit } from "../../../../actions/debits";

const DebitDetail = ({ getDebitDetail, addDebitToBank, detail, match, loading, cancelDebit }) => {
  const { id } = match.params;

  useEffect(() => {
    getDebitDetail(id);
  }, [getDebitDetail, id]);

  const processDebit = () => addDebitToBank(id);
  const cancelDebitHandler = () => cancelDebit(id);

  const invoice = () =>
    detail.user ? (
      <section className="invoice">
        {/* Invoice Title */}
        <div className="row">
          <div className="col-xs-12">
            <h2 className="page-header">
              <i className="fa fa-exchange" /> Detalles de la domiciliación
              <small className="pull-right">
                <Moment format="DD/MM/YYYY [a las] hh:mm a">{detail.createdAt}</Moment>
              </small>
            </h2>
          </div>
        </div>
        {/* Invoice Info */}
        <div className="row invoice-info">
          <div className="col-sm-4 invoice-col">
            <span className="detail__title">Realizada por:</span>
            <address>
              <strong>{detail.user.firstName + " " + detail.user.lastName}</strong>
              <br />
              {detail.user.cedula}
              <br />
              {detail.user.email}
              <br />
              {detail.user.phone}
              <span className="detail__title">Cuenta a debitar:</span>
              {detail.bankName}
              <br />
              {detail.accNumber}
              <br />
              {detail.accType}
              <span className="detail__title">Empresa:</span>
              {detail.supplier.name}
              <br />
              {detail.supplier.rif}
              <br />
              {detail.supplier.email}
              <br />
              <span className="detail__title">Producto a domiciliar:</span>
              {detail.supplier.products[0].name}
              <br />
              <strong>Porcentaje de interés: </strong>
              {Number(detail.supplier.products[0].interestRate) * 100}%
            </address>
          </div>
          <div className="col-sm-4 invoice-col">
            <address>
              <span className="detail__title">Datos de la domiciliación:</span>
              <strong>Forma de pago: </strong> {detail.debitType}
              <br />
              <strong>Periodos de pago: </strong> {detail.paymentPeriod}
              <br />
              {detail.paymentFrequency && (
                <>
                  <strong>Cuotas por cobrar: </strong>
                  {detail.remainingPayments} / {detail.paymentFrequency} cuotas
                </>
              )}
              <br />
              <br />
              <strong>Fecha de inicio de cobro: </strong>
              <Moment format="DD/MM/YYYY">{detail.startPaymentDate}</Moment>
              <br />
              {detail.endPaymentDate && (
                <>
                  <strong>Fecha final del cobro: </strong>
                  <Moment format="DD/MM/YYYY">{detail.endPaymentDate}</Moment>
                  <br />
                </>
              )}
            </address>
          </div>
          <div className="col-sm-4 invoice-col">
            <strong>Domiciliación #{detail.id}</strong>
            <br />
            <strong>Descripción: </strong> {detail.description}
            <br />
            <br />
            <span className={`status ${detail.status.name}`}>{detail.status.name}</span>
            <br />
            <br />
            <Link className="btn btn-invoice" to={`/users-payments/profile/${detail.supplier.id}`}>
              <i className="fa fa-eye" /> datos de la empresa
            </Link>
          </div>
          <div className="col-sm-4"></div>
        </div>
        {/* Incoive buttons */}
        <div className="row no-print">
          <div className="col-xs-12">
            <button
              type="button"
              className="btn btn-danger pull-right"
              onClick={cancelDebitHandler}
              disabled={detail.status.name === "fallido" || detail.status.name === "cancelado"}
            >
              Cancelar <i className="fa fa-times" />
            </button>
            <button
              type="button"
              onClick={processDebit}
              className={`btn btn-success pull-right ld-ext-right ${loading ? "running" : ""}`}
              style={{ marginRight: "5px" }}
              disabled={detail.status.name !== "pendiente" || loading}
            >
              Procesar cuota
              <div className="ld ld-ring ld-spin" />
            </button>
          </div>
        </div>
      </section>
    ) : null;

  return (
    <>
      <section className="content-header">
        <h1>
          Domiciliación <small>#{detail.id}</small>
        </h1>
      </section>
      {invoice()}
      <section className="content-header">
        <h1>Cuotas Pendientes</h1>
      </section>
      <section className="invoice">
        <Cuotas debit_id={id} remaining_amount={detail.remainingAmount} total_amount={detail.feeTotalAmount} />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.debits.debit_detail,
    loading: state.loading.loading,
  };
};

export default connect(mapStateToProps, { getDebitDetail, addDebitToBank, cancelDebit })(DebitDetail);
