import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Alert from "../../../layout/Alert";
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
import { Edit, DeleteForever } from "@material-ui/icons";
import TablePaginationActions from "../../../../helpers/TablePagination";
// REDUX
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../../store/actions/users";

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

const Users = ({ getUsers, deleteUser, users, match }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userRows = () => {
    return users.length > 0
      ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
          <TableRow key={user.id} id={user.id}>
            <TableCell component='th' scope='row'>
              {user.firstName + " " + user.lastName}
            </TableCell>
            <TableCell>{user.cedula}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {" "}
              <b style={{ textTransform: "uppercase" }}>{user.role.roleName}</b>{" "}
            </TableCell>
            <TableCell>
              <Moment format='DD/MM/YYYY'>{user.joined}</Moment>
            </TableCell>
            <TableCell className='tableCell-actions' align='center'>
              <Link to={match.url + "/edit-user/" + user.id} className='table-button'>
                Editar <Edit color='action' fontSize='large' />
              </Link>
              <button className='table-button delete' onClick={() => deleteUser(user)}>
                Eliminar <DeleteForever color='action' fontSize='large' />
              </button>
            </TableCell>
          </TableRow>
        ))
      : null;
  };

  return (
    <>
      <section className='content-header'>
        <h2 className='font-weight-bold'>Usuarios del Administrador</h2>
        <Link to={match.url + "/add-user"} className='btn btn-primary'>
          <i className='fa fa-plus'></i> Agregar usuario
        </Link>
      </section>
      <section className='content'>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-label='custom pagination table'>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Correo electrónico</TableCell>
                  <TableCell>Rol de usuario</TableCell>
                  <TableCell>Usuario desde</TableCell>
                  <TableCell align='center'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRows()}

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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "entradas por página" },
                      native: true,
                    }}
                    labelRowsPerPage='Entradas por página:'
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </section>
      <Alert />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);
