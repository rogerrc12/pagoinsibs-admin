import React, { useEffect } from "react";
import PropTypes from "prop-types";
import history from "../../helpers/history";

import SuppliersTable from "../../components/tables/SuppliersTable";

// REDUX
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const Suppliers = (props) => {
  const { match, suppliers, getSuppliers } = props;

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const suppliersColumns = [
    { title: "Nombre de la empresa", field: "name" },
    { title: "RIF", field: "rif" },
    { title: "Dirección Fiscal", field: "address" },
    { title: "Encargado/a", field: "managerName" },
    { title: "Contacto", field: "contactInfo" },
  ];

  const addSupplier = () => history.push(`${match.url}/add`);
  const viewSupplier = (id) => history.push(`${match.url}/profile/${id}`);
  const editSupplier = (id) => history.push(`${match.url}/edit/${id}`);

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Comercios Afiliados</h2>
      </section>
      <section className='content'>
        <SuppliersTable columns={suppliersColumns} add={addSupplier} view={viewSupplier} edit={editSupplier} delete={props.deleteSupplier} data={suppliers} />
      </section>
    </>
  );
};

Suppliers.propTypes = {
  suppliers: PropTypes.array.isRequired,
  deleteSupplier: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSuppliers: () => dispatch(actions.getSuppliersInit()),
  deleteSupplier: (supplier) => dispatch(actions.deleteSupplierInit(supplier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
