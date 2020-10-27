import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
// REDUX
import { connect } from "react-redux";
import { getTransferDetail, updateTransferP, updateTransferS } from "../../../../store/actions/activity";

const TransferDetail = withRouter(({ getTransferDetail, updateTransferP, updateTransferS, detail, match }) => {
  const { id } = match.params;

  useEffect(() => {
    getTransferDetail(id);
  }, [getTransferDetail, id]);

  return (
    <>
      <section className='content-header'>
        <h1>
          Transferencia <small>#{detail.id}</small>{" "}
        </h1>
      </section>
      <section className='invoice'>
        {/* Invoice Title */}
        <div className='row'>
          <div className='col-xs-12'>
            <h2 className='page-header'>
              <i className='fa fa-exchange'></i> Detalles de la transferencia
              <small className='pull-right'>
                <Moment format='DD/MM/YYYY [a las] hh:mm a'>{detail.date_issued}</Moment>
              </small>
            </h2>
          </div>
        </div>
        {/* Invoice Info */}
        <div className='row invoice-info'>
          <div className='col-sm-4 invoice-col'>
            Realizada por:
            <address>
              <strong>{detail.sender_fname + " " + detail.sender_lname}</strong>
              <br />
              {detail.sender_cedula}
              <br />
              {detail.sender_email}
              <br />
              <br />
              <strong>Cuenta a debitar:</strong>
              <br />
              {detail.bank_name}
              <br />
              {detail.acc_number}
              <br />
              {detail.acc_type}
              <br />
            </address>
          </div>
          <div className='col-sm-4 invoice-col'>
            Recibe:
            <address>
              <strong>{detail.receiver_fname + " " + detail.receiver_lname}</strong>
              <br />
              {detail.receiver_cedula}
              <br />
              {detail.receiver_email}
            </address>
          </div>
          <div className='col-sm-4 invoice-col'>
            <b>Transferencia #{detail.id}</b>
            <br />
            <b>Monto:</b> {Number(detail.amount).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.
            <br />
            <b>Descripción:</b> {detail.description}
            <br />
            <br />
            <span className={`status ${detail.status}`}>{detail.status}</span>
            <br />
            <br />
            <Link className='btn btn-invoice' to={`/users-transfers/profile/${detail.user_receiver_id}`}>
              <i className='fa fa-eye'></i> datos de receptor
            </Link>
          </div>
        </div>
        {/* Incoive buttons */}
        <div className='row no-print'>
          <div className='col-xs-12'>
            <button type='button' className='btn btn-danger pull-right' disabled={detail.status !== "pendiente" && detail.status !== "procesando"}>
              <i className='fa fa-times'></i> Cancelar
            </button>
            <button
              type='button'
              className='btn btn-success pull-right'
              style={{ marginRight: "5px" }}
              onClick={() => {
                return detail.status === "pendiente"
                  ? updateTransferP(detail.id, detail.sender_fname + " " + detail.sender_lname, detail.sender_email)
                  : updateTransferS(detail.id, detail.sender_fname + " " + detail.sender_lname, detail.sender_email);
              }}
              disabled={detail.status !== "pendiente" && detail.status !== "procesando"}>
              <i className='fa fa-check-square-o'></i> Procesar
            </button>
          </div>
        </div>
      </section>
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    detail: state.activity.transfer_detail,
  };
};

export default connect(mapStateToProps, { getTransferDetail, updateTransferP, updateTransferS })(TransferDetail);
