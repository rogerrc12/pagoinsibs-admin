import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getDebitsCount } from '../../actions/debits';
import { getPaymentsCount } from '../../actions/payments';

const Header = withRouter(({ user, logout, pendingPayments, pendingDebits, getPaymentsCount, getDebitsCount, location }) => {
  const { pathname } = location;
  const prevPath = useRef();

  // get pending payments
  useEffect(() => {
    if (prevPath.current !== pathname) {
      return () => getPaymentsCount('pending');
    } else {
      getPaymentsCount('pending');
    }
  }, [getPaymentsCount, pathname]);

  // get pending debits
  useEffect(() => {
    if (prevPath.current !== pathname) { 
      return () => getDebitsCount('pending');
    } else {
      getDebitsCount('pending');
    }
  }, [getDebitsCount, pathname]);

  const totalTransactions = pendingPayments + pendingDebits;

  return (
    <>
      <header className="main-header">
        {/* Logo */}
        <NavLink to="/activity" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">P<b>I</b></span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">PAGO <b>INSIBS</b></span>
        </NavLink>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a href="/" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Notifications */}
              <li className="dropdown notifications-menu">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-bell-o" />
                  <span style={{ fontSize: '13px' }}
                    className={`label ${totalTransactions === 0 ? 'label-info' : totalTransactions < 5 ? 'label-warning' : 'label-danger'}`}
                  >
                    {totalTransactions}
                  </span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">
                    {totalTransactions === 0 ? 'No hay transacciones pendientes' : `Tienes ${totalTransactions} transacciones pendientes`}
                  </li>
                  {totalTransactions === 0
                  ? null
                  :
                  <li>
                    <ul className="menu">
                      <li>
                        <Link to="/users-pending-payments">
                          <i className="fa fa-users text-red" /> {pendingPayments} pagos pendientes
                        </Link>
                      </li>
                      <li>
                        <Link to="/pending-direct-debits">
                          <i className="fa fa-shopping-cart text-green" /> {pendingDebits} domiciliaciones pendientes
                        </Link>
                      </li>
                    </ul>
                  </li>
                  }
                </ul>
              </li>
              {/* User Account */}
              <li className="dropdown user user-menu">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <span className="hidden-xs">{user !== null && (user.firstName + ' ' + user.lastName)}</span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-body">
                    <p>
                      {user !== null && (user.firstName + ' ' + user.lastName)}
                      <br />
                      <span className="capitalize"><strong>{user !== null && (user.role.roleName)}</strong></span>
                      <br />
                      <small>Member since Nov. 2012</small>
                    </p>
                  </li>
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <NavLink to="/profile" className="btn btn-default btn-flat">Ver perfil</NavLink>
                    </div>
                    <div className="pull-right">
                      <a 
                        href="/" 
                        className="btn btn-default btn-flat"
                        onClick={
                            e => {
                            e.preventDefault();
                            logout();
                          }
                        }>
                        cerrar sesión
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <a 
                  href="/" 
                  onClick={
                      e => {
                      e.preventDefault();
                      logout();
                    }
                }>
                  <i className="fa fa-sign-out" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
})

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getPaymentsCount: PropTypes.func.isRequired,
  getDebitsCount: PropTypes.func.isRequired,
  pendingDebits: PropTypes.number.isRequired,
  pendingPayments: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pendingDebits: state.debits.pending_debits_count,
    pendingPayments: state.payments.pending_payments_count
  }
}

export default connect(mapStateToProps, { logout, getPaymentsCount, getDebitsCount })(Header);