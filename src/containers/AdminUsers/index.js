import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInit } from "../../store/actions/users";
import history from "../../helpers/history";

import UsersTable from "../../components/tables/AdminUsersTable";
import AddUser from "./AddUser";

const AdminUsers = (props) => {
  const dispatch = useDispatch();
  const { adminUsers, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersInit());
  }, [dispatch]);

  const addUserHandler = () => history.push(props.match.url + "/add-user");
  const editUserHandler = (id) => history.push(props.match.url + "/edit-user/" + id);

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Usuarios administrativos</h2>
      </section>
      <section className='content'>
        <UsersTable data={adminUsers} isLoading={isLoading} addUser={addUserHandler} editUser={editUserHandler} />
      </section>

      <Route path={props.match.url + "/add-user"} component={AddUser} />
      <Route path={props.match.url + "/edit-user/:id"} component={AddUser} />
    </>
  );
};

export default AdminUsers;
