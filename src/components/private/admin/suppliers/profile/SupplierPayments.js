import React from 'react';
import PaginatedTable from '../../../tableSearch/PaginatedTable';
import moment from 'moment';

const columns = [
  { id: 'description', label: 'Descripción', minWidth: 200 },
  { 
    id: 'amount', label: 'Monto total', 
    minWidth: 150, format: value => Number(value).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs.'
  },
  { id: 'user', label: 'Usuario', minWidth: 150 },
  {
    id: 'createdAt', label: 'Fecha de pago', 
    minWidth: 150, format: value => moment(value).format('DD/MM/YYY') 
  },
  { id: 'type', label: 'Tipo de pago', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 200 }
];

const SupplierPayments = ({ payments }) => {

  return (
    <section className="invoice">
       <div className="row">
          <div className="col-xs-12 content-header">
            <h2 className="page-header">
              <i className="fa fa-money" /> Pagos recibidos
            </h2>
            <button className="btn btn-success">Generar reporte</button>
          </div>
        </div>

        <PaginatedTable columns={columns} rows={payments} />
    </section>
  )
}

export default SupplierPayments;
