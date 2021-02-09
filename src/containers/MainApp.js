import React, { useEffect, useRef } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "../assets/css/custom.css";
import { connect } from "react-redux";
import Login from "../components/auth/Login";
import Alert from "../components/layout/Alert";
// Redux
import * as actions from "../store/actions";
import PrivateRoute from "../components/routing/PrivateRoute";
// Private Routes
import dashboard from "../components/private/Dashboard";
import GenerateReport from "./Reports";
import AdminUsers from "./AdminUsers";
import Subscribers from "./Users/index";
import SubscribersProfile from "./Users/Profile";
import Currencies from "./Currencies/Currencies";
import Products from "./Products/Products";
// Suppliers imports
import Suppliers from "./Suppliers/Suppliers";
import AddSupplierAccount from "./Suppliers/AddAccount";
import AddSupplier from "./Suppliers/AddSupplier";
import SupplierProfile from "./Suppliers/Profile";
import EditProduct from "./Products/EditProduct";
// Payments imports
import ProcessingPayments from "./Payments/Pending";
import AllPayments from "./Payments/All";
import PaymentDetails from "./Payments/Details";
// Debits imports
import PendingDebits from "./Debits/Pending";
import AllDebits from "./Debits/All";
import DebitDetails from "./Debits/Details";

import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import Footer from "../components/layout/Footer";
// Bank payments imports
import BankPayments from "../components/private/bankPayments";

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
      <div className={props.isAuthenticated ? "content-wrapper" : "login-wrapper"}>
        <Route exact path='/' component={Login} />
        <Switch>
          <PrivateRoute exact path='/activity' component={dashboard} />

          {/* All Payments routes */}
          <PrivateRoute exact path='/all-payments' component={AllPayments} />
          <PrivateRoute exact path='/payments/:currencyType' component={ProcessingPayments} />
          <PrivateRoute exact path='/payments/details/:paymentId' component={PaymentDetails} />

          {/* All Direct Debit routes */}
          <PrivateRoute exact path='/all-debits' component={AllDebits} />
          <PrivateRoute exact path='/debits/:currencyType' component={PendingDebits} />
          <PrivateRoute exact path='/debits/details/:id' component={DebitDetails} />

          {/* All bank payments routes */}
          <PrivateRoute exact path='/bank-payments' component={BankPayments} />

          {/* All Admin users routes */}
          <PrivateRoute path='/users' component={AdminUsers} />

          {/* All Subscribers routes */}
          <PrivateRoute exact path='/subscribers' component={Subscribers} />
          <PrivateRoute exact path='/subscribers/profile/:id' component={SubscribersProfile} />

          {/* All supplier routes */}
          <PrivateRoute exact path='/suppliers' component={Suppliers} />
          <PrivateRoute exact path='/suppliers/add' component={AddSupplier} />
          <PrivateRoute exact path='/suppliers/edit/:id' component={AddSupplier} />
          <PrivateRoute exact path='/suppliers/profile/:id' component={SupplierProfile} />
          <PrivateRoute exact path='/suppliers/profile/add-account/:supplier_id' component={AddSupplierAccount} />
          <PrivateRoute exact path='/products/add/:supplier_id' component={EditProduct} />
          <PrivateRoute exact path='/products/edit/:product_id' component={EditProduct} />
          <PrivateRoute exact path='/generate-report' component={GenerateReport} />

          {/* All currencies routes */}
          <PrivateRoute path='/currencies' component={Currencies} />
          <PrivateRoute path='/products' component={Products} />
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
