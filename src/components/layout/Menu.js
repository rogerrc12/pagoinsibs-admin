import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = ({ auth: { user } }) => {

  const toggleMenu = e => {
    const btn = e.currentTarget;
    const menu = btn.nextSibling;

    if (btn.classList.contains('open')) {
      btn.classList.remove('open');
      setTimeout(() => {
        menu.style.display = 'none';
      }, 1000)
    } else {
      menu.style.display = 'block';
      setTimeout(() => {
        btn.classList.add('open');
      }, 10)
    }
  };
  
  return (
    <aside className="main-sidebar">
      {/* sidebar: style can be found in sidebar.less */}
      <section className="sidebar">
        {/* Sidebar user panel */}
        <div className="user-panel">
          <div className="pull-left info">
            <p>{user.firstName + ' ' + user.lastName}</p>
            <a href="/"><i className="fa fa-circle text-success" /> Online</a>
          </div>
        </div>
        {/* sidebar menu */}
        <ul className="sidebar-menu" data-widget="tree">
          <li className="header">Menú Principal</li>
          <li>
            <NavLink to="/activity" activeClassName="active">
              <i className="fa fa-dashboard" /> <span>Resumen</span>
            </NavLink>
          </li>
          <li className="treeview" onClick={toggleMenu}>
            <button>
              <i className="fa fa-usd" aria-hidden="true"/> <span>Pagos únicos</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" aria-hidden="true"/>
              </span>
            </button>
          </li>
          <ul className="treeview-menu">
            <li><NavLink to="/users-pending-payments" activeClassName="active">Pendientes</NavLink></li>
            <li><NavLink to="/users-payments" activeClassName="active">Recibidos</NavLink></li>
            <li><NavLink to="/users-tdc-payments" activeClassName="active">Con tarjeta</NavLink></li>
          </ul>
          <li onClick={toggleMenu} className="treeview">
            <button>
              <i className="fa fa-money" aria-hidden="true"/> <span>Domiciliaciones</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" aria-hidden="true"/>
              </span>
            </button>
          </li>
          <ul className="treeview-menu">
            <li><Link to="/pending-direct-debits">Pendientes</Link></li>
            <li><Link to="/direct-debits">Recibidas</Link></li>
          </ul>
          <li onClick={toggleMenu} className="treeview">
            <button>
              <i className="fa fa-university" aria-hidden="true"/> <span>Pagos por banco</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" aria-hidden="true"/>
              </span>
            </button>
          </li>
          <ul className="treeview-menu">
            <li><Link to="/bank-payments?bankId=0134&bankName=Banesco">Banesco</Link></li>
            <li><Link to="/bank-payments?bankId=0175&bankName=Bicentenario">Bicentenario</Link></li>
            <li><Link to="/bank-payments?bankId=0116&bankName=BOD">BOD</Link></li>
            <li><Link to="/bank-payments?bankId=0151&bankName=Fondo+Comun">Fondo Común</Link></li>
            <li><Link to="/bank-payments?bankId=0105&bankName=Mercantil">Mercantil</Link></li>
            <li><Link to="/bank-payments?bankId=0108&bankName=Provincial">Provincial</Link></li>
            <li><Link to="/bank-payments?bankId=0163&bankName=Tesoro">Tesoro</Link></li>
            <li><Link to="/bank-payments?bankId=0102&bankName=Venezuela">Venezuela</Link></li>
          </ul>
          {
            user.role.roleName === 'manager' || user.role.roleName === 'admin'
            ?
            <>
              <li className="header">Opciones de Administrador</li>
              <li>
                <NavLink to="/generate-report"><i className="fa fa-file" aria-hidden="true"/> <span>Generar reporte</span></NavLink>
              </li>
              <li><NavLink to="/subscribers"><i className="fa fa-user-circle" /> <span>Suscriptores</span></NavLink></li>
              <li><NavLink to="/users"><i className="fa fa-user-secret" /> <span>Usuarios</span></NavLink></li>
              <li><NavLink to="/suppliers"><i className="fa fa-home" /> <span>Comercios Afiliados</span></NavLink></li>
            </>
            :
            ''
          }
        </ul>
      </section>
      {/* /.sidebar */}
    </aside>
  )
}

Menu.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Menu);
