import React, { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
// MATERIAL TABLE
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Visibility } from "@material-ui/icons";
import TablePaginationActions from "../../../../helpers/TablePagination";
// REDUX
import { connect } from "react-redux";
import { getSubscribers } from "../../../../store/actions/users";

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: "auto",
  },
}));

const Subscribers = ({ getSubscribers, subscribers, match }) => {
  useEffect(() => {
    getSubscribers();
  }, [getSubscribers]);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, subscribers.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <section className="content-header">
        <h2 className="text-uppercase font-weight-bold">Usuarios del Administrador</h2>
      </section>
      <section className="content">
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Ver perfil</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Nombre de usuario</TableCell>
                  <TableCell>Usuario desde</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subscriber) => (
                  <TableRow key={subscriber.id} id={subscriber.id}>
                    <TableCell>
                      <NavLink to={match.url + "/profile/" + subscriber.id} className="action-button__table">
                        <Visibility color="action" fontSize="large" />
                      </NavLink>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {subscriber.firstName + " " + subscriber.lastName}
                    </TableCell>
                    <TableCell>{subscriber.cedula}</TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.username}</TableCell>
                    <TableCell>
                      <Moment format="DD/MM/YYYY">{subscriber.joined}</Moment>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={subscribers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "entradas por página" },
                      native: true,
                    }}
                    labelRowsPerPage="Entradas por página:"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    subscribers: state.users.subscribers,
  };
};

Subscribers.propTypes = {
  subscribers: PropTypes.array.isRequired,
  getSubscribers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getSubscribers })(Subscribers);
