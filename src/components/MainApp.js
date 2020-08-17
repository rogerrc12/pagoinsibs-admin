import React, { useEffect, useRef } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "../assets/css/custom.css";
import { connect } from "react-redux";
import Login from "./auth/Login";
import Alert from "./layout/Alert";
// Redux
import { closeAlert } from "../actions/alert";
import { getBanks } from "../actions/activity";
import { getSuppliers } from "../actions/suppliers";
import PrivateRoute from "./routing/PrivateRoute";
// Private Routes
import dashboard from "./private/Dashboard";
import GenerateReport from "./private/generateReport";
import Users from "./private/admin/users";
import AddUser from "./private/admin/users/form/Add";
import EditUser from "./private/admin/users/form/Edit";
import Subscribers from "./private/admin/subscribers/Subscribers";
import SubscribersProfile from "./private/admin/subscribers/profile";
// Suppliers imports
import Suppliers from "./private/admin/suppliers";
import SupplierAccountForm from "./private/admin/suppliers/add/AddBankAccount";
import AddSupplier from "./private/admin/suppliers/add/AddSupplier";
import SupplierProfile from "./private/admin/suppliers/profile/Profile";
import AddProduct from "./private/admin/suppliers/products/add";
import EditProduct from "./private/admin/suppliers/products/edit";
// Payments imports
import PaymentsPending from "./private/payments/Pending";
import PaymentsSuccess from "./private/payments/Success";
import PaymentDetail from "./private/payments/Details";
// Debits imports
import DebitsPending from "./private/debits/Pending";
import DebitsSuccess from "./private/debits/Success";
import DebitDetail from "./private/debits/detail";
// eslint-disable-next-line import/no-cycle
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import Footer from "./layout/Footer";
// Bank payments imports
import BankPayments from "./private/bankPayments";

const MainApp = (props) => {
  const { getBanks, closeAlert, getSuppliers } = props;
  const { pathname } = props.location;
  const prevPath = useRef();

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  useEffect(() => {
    if (prevPath.current !== pathname && alert.open) {
      closeAlert();
    }
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
        <Route exact path="/" component={Login} />
        <Switch>
          <PrivateRoute exact path="/activity" component={dashboard} />

          {/* All Payments routes */}
          <PrivateRoute exact path="/users-payments" component={PaymentsSuccess} />
          <PrivateRoute exact path="/users-pending-payments" component={PaymentsPending} />
          <PrivateRoute exact path="/users-payments/detail/:id" component={PaymentDetail} />

          {/* All Direct Debit routes */}
          <PrivateRoute exact path="/pending-direct-debits" component={DebitsPending} />
          <PrivateRoute exact path="/direct-debits" component={DebitsSuccess} />
          <PrivateRoute exact path="/users-direct-debits/detail/:id" component={DebitDetail} />

          {/* All bank payments routes */}
          <PrivateRoute exact path="/bank-payments" component={BankPayments} />

          {/* All Admin users routes */}
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/users/add-user" component={AddUser} />
          <PrivateRoute exact path="/users/edit-user/:id" component={EditUser} />

          {/* All Subscribers routes */}
          <PrivateRoute exact path="/subscribers" component={Subscribers} />
          <PrivateRoute exact path="/subscribers/profile/:id" component={SubscribersProfile} />

          {/* All supplier routes */}
          <PrivateRoute exact path="/suppliers" component={Suppliers} />
          <PrivateRoute exact path="/suppliers/add-account/:id" component={SupplierAccountForm} />
          <PrivateRoute exact path="/suppliers/add" component={AddSupplier} />
          <PrivateRoute exact path="/suppliers/profile/:id" component={SupplierProfile} />
          <PrivateRoute exact path="/suppliers/products/add/:supplier_id" component={AddProduct} />
          <PrivateRoute exact path="/suppliers/products/edit/:supplier_id/:product_id" component={EditProduct} />
          <PrivateRoute exact path="/generate-report" component={GenerateReport} />
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
    getSuppliers: () => dispatch(getSuppliers()),
    closeAlert: () => dispatch(closeAlert()),
    getBanks: () => dispatch(getBanks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainApp));
