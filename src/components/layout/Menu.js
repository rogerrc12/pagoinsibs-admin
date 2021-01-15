import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AdminNavItems from "../Navigation/AdminNavItems";
import NavItems from "../Navigation/NavItems";

const Menu = ({ auth: { user } }) => {
  const toggleMenu = (e) => {
    const btn = e.currentTarget;
    const menu = btn.nextSibling;

    if (btn.classList.contains("open")) {
      btn.classList.remove("open");
      setTimeout(() => {
        menu.style.display = "none";
      }, 1000);
    } else {
      menu.style.display = "block";
      setTimeout(() => {
        btn.classList.add("open");
      }, 10);
    }
  };

  return (
    <aside className='main-sidebar'>
      {/* sidebar: style can be found in sidebar.less */}
      <section className='sidebar'>
        {/* Sidebar user panel */}
        <div className='user-panel'>
          <div className='pull-left info'>
            <p>{user.firstName + " " + user.lastName}</p>
            <a href='/'>
              <i className='fa fa-circle text-success' /> Online
            </a>
          </div>
        </div>
        {/* sidebar menu */}
        <ul className='sidebar-menu' data-widget='tree'>
          <li className='header'>Menú Principal</li>
          <NavItems toggleMenu={toggleMenu} />
          <li onClick={toggleMenu} className='treeview'>
            <button>
              <i className='fa fa-university' aria-hidden='true' /> <span>Pagos por banco</span>
              <span className='pull-right-container'>
                <i className='fa fa-angle-left pull-right' aria-hidden='true' />
              </span>
            </button>
          </li>
          <ul className='treeview-menu'>
            <li>
              <Link to='/bank-payments?bankId=0134&bankName=Banesco'>Banesco</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0175&bankName=Bicentenario'>Bicentenario</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0116&bankName=BOD'>BOD</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0151&bankName=Fondo+Comun'>Fondo Común</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0105&bankName=Mercantil'>Mercantil</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0108&bankName=Provincial'>Provincial</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0163&bankName=Tesoro'>Tesoro</Link>
            </li>
            <li>
              <Link to='/bank-payments?bankId=0102&bankName=Venezuela'>Venezuela</Link>
            </li>
          </ul>
          {user.role.roleName === "manager" || (user.role.roleName === "admin" && <AdminNavItems />)}
        </ul>
      </section>
      {/* /.sidebar */}
    </aside>
  );
};

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Menu);
