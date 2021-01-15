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
        <NavItem link='/payments/dolares'>En dólares</NavItem>
        <NavItem link='/payments/bolivares'>En bolívares</NavItem>
        <NavItem link='/all-payments'>Totales</NavItem>
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
        <NavItem link='/debits/dolares'>En dólares</NavItem>
        <NavItem link='/debits/bolivares'>En bolívares</NavItem>
        <NavItem link='/all-debits'>Totales</NavItem>
      </ul>
    </>
  );
};

export default NavItems;
