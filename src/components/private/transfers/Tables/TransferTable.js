import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import m from 'moment';
import { Link } from 'react-router-dom';
// React Table
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CheckBox } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// REDUX
import { connect } from 'react-redux';
import { loadTransfers } from '../../../../actions/activity';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  { id: 'status', label: 'Estado', minWidth: 100 },
  { id: 'amount', label: 'Monto', minWidth: 150 },
  { id: 'description', label: 'Descripción', minWidth: 160 },
  { id: 'date_issued', label: 'Fecha', minWidth: 160 },
  { id: 'sender_name', label: 'Envia', minWidth: 150 },
  { id: 'sender_cedula', label: 'Envia: cédula', minWidth: 130 },
  { id: 'receiver_name', label: 'Recibe', minWidth: 150 },
  { id: 'actions', label: 'Acciones', minWidth: 100 },
]

const TransferTable = ({ loadTransfers, transfers }) => {
  useEffect(() => {
    loadTransfers();
  }, [loadTransfers]);

  const classes = useStyles1();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transfers ? transfers.length : 0 - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Query Search
  const [filterOptions, setFilterOptions] = useState({query: '', select: 'status'});
  const { query, select } = filterOptions;

  const filteredTransfers = transfers.filter(transfer => {
    let options;
    let formatDate;
    if (filterOptions.select === 'date_issued') {
      formatDate = m(transfer[select]).format('DD/MM/YYYY hh:mm a');
      options = formatDate.includes(query);
    } else {
      options = transfer[select].includes(query.toLowerCase())
    }
    return options;
  });

  return (
    <>
      <section className="content-header">
        <h2 className="text-uppercase font-weight-bold">Envios de dinero</h2>
        <div className="search-table">
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="filter">Buscar por:</InputLabel>
            <NativeSelect
              value={select}
              onChange={e => setFilterOptions({ ...filterOptions, select: e.target.value })}
              inputProps={{
                name: 'select',
                id: 'filter',
              }}
            >
              <option value="status">Estado</option>
              <option value="date_issued">Fecha generada</option>
              <option value="sender_cedula">Cédula del emisor</option>
            </NativeSelect>
            <FormHelperText>Filtra la busqueda según la opción</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-search"
              label="Buscar"
              type="search"
              className={classes.textField}
              variant="outlined"
              value={query}
              onChange={e => setFilterOptions({ ...filterOptions, query: e.target.value })}
            />
          </FormControl>
        </div>
      </section>
      <section className="content">
      <Paper className="activity-table">
        <div style={{ maxHeight: '440px', overflow: 'auto', width: '100%' }}>

          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransfers.map(transfer => (
                <TableRow key={transfer.id}>
                  <TableCell className={'status ' + transfer.status}>
                    {transfer.status}
                  </TableCell>
                  <TableCell>{Number(transfer.amount).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.</TableCell>
                  <TableCell>{transfer.description}</TableCell>
                  <TableCell>
                    <Moment format="DD/MM/YYYY hh:mm a">
                      {transfer.date_issued}
                    </Moment>
                  </TableCell>
                  <TableCell>{transfer.sender_fname + ' ' + transfer.sender_lname}</TableCell>
                  <TableCell>{transfer.sender_cedula}</TableCell>
                  <TableCell>{transfer.receiver_fname + ' ' + transfer.receiver_lname}</TableCell>
                  <TableCell className="tableCell-actions">
                    <Link className="table-button" to={`/users-transfers/detail/${transfer.id}`}> 
                      { transfer.status === 'pendiente' || transfer.status === 'procesando'
                        ? 'Procesar'
                        : 'Detalle' }
                      <CheckBox color="action" fontSize="large" />
                    </Link>
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
                rowsPerPageOptions={[4, 8]}
                count={transfers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Filas por hoja' },
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
    </>
  );
}

TransferTable.propTypes = {
  transfers: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    transfers: state.activity.transfers
  }
}

export default connect(mapStateToProps, { loadTransfers })(TransferTable);