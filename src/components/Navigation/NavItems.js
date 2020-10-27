import React from "react";
import NavItem from "./NavItem";

const NavItems = (props) => {
  return (
    <>
      <NavItem link='/activity'>
        <i className='fa fa-dashboard' /> <span>Resumen</span>
      </NavItem>
      <li className='treeview' onClick={props.toggleMenu}>
        <button>
          <i className='fa fa-usd' aria-hidden='true' /> <span>Pagos únicos</span>
          <span className='pull-right-container'>
            <i className='fa fa-angle-left pull-right' aria-hidden='true' />
          </span>
        </button>
      </li>
      <ul className='treeview-menu'>
        <NavItem link='/users-pending-payments'>Pendientes</NavItem>
        <NavItem link='/users-payments'>Recibidos</NavItem>
        <NavItem link='/users-tdc-payments'>Con tarjeta</NavItem>
      </ul>
      <li onClick={props.toggleMenu} className='treeview'>
        <button>
          <i className='fa fa-money' aria-hidden='true' /> <span>Domiciliaciones</span>
          <span className='pull-right-container'>
            <i className='fa fa-angle-left pull-right' aria-hidden='true' />
          </span>
        </button>
      </li>
      <ul className='treeview-menu'>
        <NavItem link='/pending-direct-debits'>Pendientes</NavItem>
        <NavItem link='/direct-debits'>Recibidas</NavItem>
      </ul>
    </>
  );
};

export default NavItems;
