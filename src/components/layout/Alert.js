import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { Error, CheckCircle, Close } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
// REDUX
import { connect } from "react-redux";
import { closeAlert } from "../../store/actions/alert";

const Alert = ({ alert, closeAlert }) => {
  const Icon = alert.iconType === "error" ? Error : CheckCircle;

  return (
    <Snackbar
      className={`snackbar-${alert.iconType}`}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={alert.open}
      autoHideDuration={8000}
      onClose={closeAlert}
      message={
        <span id='admin-snackbar' style={{ display: "flex", alignItems: "center" }}>
          <Icon />
          <span style={{ marginLeft: "15px", fontSize: "1.35rem" }}>{alert.message}</span>
        </span>
      }
      action={[
        <IconButton key='close' aria-label='close' color='inherit' onClick={closeAlert}>
          <Close />
        </IconButton>,
      ]}
    />
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { closeAlert })(Alert);
