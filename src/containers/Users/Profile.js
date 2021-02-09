import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileInit } from "../../store/actions";

import PaymentsTable from "../../components/tables/users/PaymentsTable";
import AccountsTable from "../../components/tables/users/AccountsTable";

const Profile = (props) => {
  const { params } = props.match;
  const dispatch = useDispatch();
  const { information, payments, accounts } = useSelector((state) => state.users.profile);

  const { id } = params;

  useEffect(() => {
    dispatch(getProfileInit(id));
  }, [id, dispatch]);

  return (
    <section className='content'>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className='col-md-6'>
          <div className='box box-primary text-center'>
            <div className='box-body box-profile'>
              <span className='fa fa-user-circle-o fa-5x' />

              <h3 className='profile-username '>{information.firstName + " " + information.lastName}</h3>

              <p className='text-uppercase'>
                <b>Información:</b>
              </p>
              <p>
                <b>Cédula:</b> {information.cedula}
              </p>
              <p>
                <b>Email:</b> {information.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className='invoice'>
        <div className='row'>
          <div className='col-xs-12'>
            <h2 className='page-header'>
              <i className='fa fa-money' /> Transacciones recibidas
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <PaymentsTable data={payments} />
          </div>
        </div>
      </section>

      <section className='invoice'>
        <div className='row'>
          <div className='col-xs-12'>
            <h2 className='page-header'>
              <i className='fa fa-university' /> Cuentas bancarias
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <AccountsTable data={accounts} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
