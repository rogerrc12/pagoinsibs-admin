import React from "react";
import { TableCell, TableRow, TableHead, TableBody } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import SimpleTable from "../UI/tables/SimpleTable";

const CurrenciesTable = (props) => {
  return (
    <SimpleTable>
      <TableHead>
        <TableRow>
          <TableCell>Moneda</TableCell>
          <TableCell>Código ISO</TableCell>
          <TableCell>Símbolo</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.currencies.map((currency) => (
          <TableRow key={currency.id}>
            <TableCell>{currency.name}</TableCell>
            <TableCell>{currency.ISO}</TableCell>
            <TableCell>{currency.symbol}</TableCell>
            <TableCell>
              <button className='btn btn-warning'>
                <Edit /> Editar
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </SimpleTable>
  );
};

export default CurrenciesTable;
