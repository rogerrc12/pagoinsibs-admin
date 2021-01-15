import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavItems = () => {
  return (
    <>
      <li className='header'>Opciones de Administrador</li>
      <li>
        <NavLink to='/generate-report'>
          <i className='fa fa-file' aria-hidden='true' /> <span>Generar reporte</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/subscribers'>
          <i className='fa fa-user-circle' /> <span>Suscriptores</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/users'>
          <i className='fa fa-user-secret' /> <span>Usuarios</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/suppliers'>
          <i className='fa fa-home' /> <span>Comercios Afiliados</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/products'>
          <i className='fa fa-archive' /> <span>Productos creados</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/currencies'>
          <i className='fa fa-usd' /> <span>Monedas</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminNavItems;
