import React, { useEffect, useRef, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Alert from '../components/layout/Alert';
// Redux
import * as actions from '../store/actions';
import PrivateRoute from '../components/routing/PrivateRoute';

import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import Footer from '../components/layout/Footer';
import AsyncComponent from '../hoc/AsyncComponent';

import '../assets/css/custom.css';

const dashboard = lazy(() => import('../components/private/Dashboard'));
const GenerateReport = lazy(() => import('./Reports'));
const AdminUsers = lazy(() => import('./AdminUsers'));
const Subscribers = lazy(() => import('./Users/index'));
const SubscribersProfile = lazy(() => import('./Users/Profile'));
const Currencies = lazy(() => import('./Currencies/Currencies'));
const Products = lazy(() => import('./Products/Products'));
const Suppliers = lazy(() => import('./Suppliers/Suppliers'));
const AddSupplierAccount = lazy(() => import('./Suppliers/AddAccount'));
const AddSupplier = lazy(() => import('./Suppliers/AddSupplier'));
const SupplierProfile = lazy(() => import('./Suppliers/Profile'));
const EditProduct = lazy(() => import('./Products/EditProduct'));
const ProcessingPayments = lazy(() => import('./Payments/Pending'));
const AllPayments = lazy(() => import('./Payments/All'));
const PaymentDetails = lazy(() => import('./Payments/Details'));
const PendingDebits = lazy(() => import('./Debits/Pending'));
const AllDebits = lazy(() => import('./Debits/All'));
const DebitDetails = lazy(() => import('./Debits/Details'));
const BankPayments = lazy(() => import('../components/private/bankPayments'));

const MainApp = (props) => {
  const { getBanks, closeAlert, getSuppliers, getCurrencies, isAuthenticated } = props;
  const { pathname } = props.location;
  const prevPath = useRef();

  useEffect(() => {
    if (isAuthenticated) {
      getCurrencies();
      getSuppliers();
      getBanks();
    }
  }, [isAuthenticated, getCurrencies, getSuppliers, getBanks]);

  useEffect(() => {
    if (prevPath.current !== pathname && alert.open) closeAlert();
    prevPath.current = pathname;
  }, [pathname, closeAlert]);

  return (
    <>
      {props.isAuthenticated && (
        <>
          <Header />
          <Menu />
        </>
      )}
      <div className={props.isAuthenticated ? 'content-wrapper' : 'login-wrapper'}>
        <Route exact path='/' component={Login} />
        <Switch>
          <PrivateRoute exact path='/activity' component={AsyncComponent(dashboard)} />

          {/* All Payments routes */}
          <PrivateRoute exact path='/all-payments' component={AsyncComponent(AllPayments)} />
          <PrivateRoute exact path='/payments/:currencyType' component={AsyncComponent(ProcessingPayments)} />
          <PrivateRoute exact path='/payments/details/:paymentId' component={AsyncComponent(PaymentDetails)} />

          {/* All Direct Debit routes */}
          <PrivateRoute exact path='/all-debits' component={AsyncComponent(AllDebits)} />
          <PrivateRoute exact path='/debits/:currencyType' component={AsyncComponent(PendingDebits)} />
          <PrivateRoute exact path='/debits/details/:id' component={AsyncComponent(DebitDetails)} />

          {/* All bank payments routes */}
          <PrivateRoute exact path='/bank-payments' component={AsyncComponent(BankPayments)} />

          {/* All Admin users routes */}
          <PrivateRoute path='/users' component={AsyncComponent(AdminUsers)} />

          {/* All Subscribers routes */}
          <PrivateRoute exact path='/subscribers' component={AsyncComponent(Subscribers)} />
          <PrivateRoute exact path='/subscribers/profile/:id' component={AsyncComponent(SubscribersProfile)} />

          {/* All supplier routes */}
          <PrivateRoute exact path='/suppliers' component={AsyncComponent(Suppliers)} />
          <PrivateRoute exact path='/suppliers/add' component={AsyncComponent(AddSupplier)} />
          <PrivateRoute exact path='/suppliers/edit/:id' component={AsyncComponent(AddSupplier)} />
          <PrivateRoute exact path='/suppliers/profile/:id' component={AsyncComponent(SupplierProfile)} />
          <PrivateRoute exact path='/suppliers/profile/add-account/:supplier_id' component={AsyncComponent(AddSupplierAccount)} />
          <PrivateRoute exact path={['/products/add/:supplier_id', '/products/edit/:product_id']} component={AsyncComponent(EditProduct)} />
          <PrivateRoute exact path='/generate-report' component={AsyncComponent(GenerateReport)} />

          {/* All currencies routes */}
          <PrivateRoute path='/currencies' component={AsyncComponent(Currencies)} />
          <PrivateRoute path='/products' component={AsyncComponent(Products)} />
        </Switch>
      </div>
      {props.isAuthenticated && <Footer />}
      <Alert />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.alert,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSuppliers: () => dispatch(actions.getSuppliersInit()),
    closeAlert: () => dispatch(actions.closeAlert()),
    getBanks: () => dispatch(actions.getBanksInit()),
    getCurrencies: () => dispatch(actions.getCurrenciesInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainApp));
