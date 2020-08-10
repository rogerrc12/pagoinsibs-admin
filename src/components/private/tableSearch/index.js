import React, {useState} from 'react';
import PropTypes from 'prop-types';
import m from "moment";
import {FormControl, FormHelperText, InputLabel, NativeSelect, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

TableSearch.propTypes = {
  payments: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired
};

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

function TableSearch({ payments, setFilter }) {
  
  const classes = useStyles1();
  // Query Search
  const [filterOptions, setFilterOptions] = useState({select: 'status'});
  const { select } = filterOptions;
  
  const onInputChange = e => {
    const filtered = payments.filter(payment => {
      const query = e.target.value;
    
      let formatDate;
      switch(select) {
        case 'status' :
          return payment.status.name.includes(query.toLowerCase());
      
        case 'startPaymentDate' :
          formatDate = m(payment[select]).format('DD/MM/YYYY hh:mm a');
          return formatDate.includes(query);
      
        case 'supplierName' :
          return payment.supplier.name.includes(query.toUpperCase());
      
        case 'cedula' :
          return payment.user.cedula.includes(query.toUpperCase());
      
        default :
          return payment[select].toLowerCase().includes(query.toLowerCase());
      }
    });
    setFilter(filtered);
  }
  
  return (
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
          <option value='bankName'>Banco</option>
          <option value="startPaymentDate">Inicio de cobro</option>
          <option value="cedula">Cédula</option>
          <option value="supplierName">Empresa</option>
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
          onChange={onInputChange}
        />
      </FormControl>
    </div>
  );
}

export default TableSearch;