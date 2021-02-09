import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubscribersInit } from "../../store/actions";
import history from "../../helpers/history";

import UsersTable from "../../components/tables/users/UsersTable";

const Users = () => {
  const dispatch = useDispatch();

  const { isLoading, subscribers } = useSelector((state) => state.users);

  const onViewUser = (id) => history.push(`/subscribers/profile/${id}`);

  useEffect(() => {
    dispatch(getSubscribersInit());
  }, [dispatch]);

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Clientes registrados</h2>
      </section>
      <section className='content'>
        <UsersTable data={subscribers} isLoading={isLoading} showUser={onViewUser} />
      </section>
    </>
  );
};

export default Users;
