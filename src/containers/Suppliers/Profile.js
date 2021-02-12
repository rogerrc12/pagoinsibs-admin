import React, { useEffect } from "react";
import { EditRounded, DeleteOutline, AddBox, DeleteForever } from "@material-ui/icons";
import history from "../../helpers/history";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getSupplierProfileInit, getSupplierProductsInit, deleteProductInit } from "../../store/actions";

import ProfileCard from "../../components/UI/Cards/ProfileCard";
import ProductsTable from "../../components/tables/ProductsTable";
import AccountsTable from "../../components/tables/users/AccountsTable";

const productColumns = [
  { title: "Nombre", field: "name" },
  { title: "Monto", field: "amount" },
  { title: "Es domiciliado", field: "isDirectDebit" },
  { title: "Tasa de interes", field: "interestRate" },
  { title: "Meses de domiciliación", field: "maxDebitMonths" },
];

const SupplierProfile = (props) => {
  const dispatch = useDispatch();
  const { supplierProducts } = useSelector((state) => state.products);
  const { supplierProfile } = useSelector((state) => state.suppliers);
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getSupplierProfileInit(id));
    dispatch(getSupplierProductsInit(id));
  }, [dispatch, id]);

  const { profile, banks } = supplierProfile;

  const editProduct = (productId) => history.push(`/products/edit/${productId}`);
  const addProduct = () => history.push(`/products/add/${id}`);
  const deleteProduct = (productId) => dispatch(deleteProductInit(productId, id));

  const addAccount = (params) => history.push(`/suppliers/profile/add-account/${id}?${params}`);

  return (
    <section className='content'>
      <ProfileCard>
        <span className='fa fa-home fa-5x' />

        <h3 className='profile-username text-center'>{profile.name}</h3>

        <p className='text-muted text-center'>RIF: {profile.rif}</p>

        <p className='text-uppercase'>
          <b>Dirección:</b>
        </p>
        <p>{profile.address}</p>
        <p className='text-uppercase'>
          <b>Correo Electrónico:</b>
        </p>
        <p>{profile.email}</p>
        <p className='text-uppercase'>
          <b>Persona Encargada:</b>
        </p>
        <p>{profile.managerFirstName + " " + profile.managerLastName}</p>
        <p className='text-uppercase'>
          <b>Teléfonos:</b>
        </p>
        <p>
          {profile.mobilePhone}
          <br />
          {profile.localPhone}
        </p>
      </ProfileCard>

      <section className='invoice' style={{ marginBottom: "3rem" }}>
        <ProductsTable
          columns={productColumns}
          data={supplierProducts}
          title='Productos asociados'
          actions={[
            { icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />, onClick: (e, rowData) => editProduct(rowData.id) },
            { icon: () => <DeleteOutline fontSize='large' style={{ color: "#ff4444" }} />, onClick: (e, rowData) => deleteProduct(rowData.id) },
            { icon: () => <AddBox color='primary' fontSize='large' />, isFreeAction: true, onClick: () => addProduct() },
          ]}
        />
      </section>

      <section className='invoice'>
        <AccountsTable
          title='Cuentas asociadas'
          data={banks}
          actions={[
            {
              icon: () => <EditRounded fontSize='large' style={{ color: "#f0ad4e" }} />,
              onClick: (e, rowData) => addAccount(`type="edit"account="${rowData.id}"`),
            },
            {
              icon: () => <AddBox color='primary' fontSize='large' />,
              isFreeAction: true,
              onClick: (e, rowData) => addAccount(`type="add"`),
            },
            { icon: () => <DeleteForever style={{ color: "#d9534f" }} fontSize='large' />, onClick: () => {} },
          ]}
        />
      </section>
    </section>
  );
};

export default SupplierProfile;
