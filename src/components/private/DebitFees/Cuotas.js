import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@material-ui/core";
import { formatAmount } from "../../../helpers/functions";
import TableContainer from "@material-ui/core/TableContainer";
import Moment from "react-moment";
// REDUX
import { connect } from "react-redux";

const useStyles = makeStyles({ table: { minWidth: 700 } });

const columns = [
  { id: "status", label: "Estado", minWidth: 100, align: "left" },
  { id: "fee_no", label: "No. cuota", minWidth: 80, align: "left" },
  { id: "payment_date", label: "Fecha de pago", minWidth: 130, align: "left" },
  { id: "due_date", label: "Fecha de vencimiento", minWidth: 130, align: "left" },
  { id: "completed_date", label: "Fecha cobrada", minWidth: 130, align: "left" },
  { id: "fee_amount", label: "Monto cuota", minWidth: 120, align: "left" },
];

const Cuotas = ({ debit_fees, getDebitFees, debit_id, remaining_amount, total_amount }) => {
  useEffect(() => {
    getDebitFees(debit_id);
  }, [getDebitFees, debit_id]);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='cuotas table' stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {debit_fees.map((fee) => (
            <TableRow key={fee.id} hover role='checkbox' tabIndex={-1}>
              <TableCell className={"status " + fee.status.name}>{fee.status.name}</TableCell>
              <TableCell align='center'>{fee.feeNo}</TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>{fee.paymentDate}</Moment>
              </TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>{fee.dueDate}</Moment>
              </TableCell>
              <TableCell>{fee.completedDate ? <Moment format='DD/MM/YYYY'>{fee.completedDate}</Moment> : "Sin cobrar"}</TableCell>
              <TableCell>{formatAmount(fee.debit.feeAmount) + " " + fee.debit.currency.symbol}</TableCell>
            </TableRow>
          ))}
          <TableRow className='total-row'>
            <TableCell colSpan={4} align='right'>
              Monto Total
            </TableCell>
            <TableCell align='left'>
              {formatAmount(total_amount)} {debit_fees.length > 0 && debit_fees[0].debit.currency.symbol}
            </TableCell>
          </TableRow>
          <TableRow className='total-row'>
            <TableCell colSpan={4} align='right'>
              Monto restante
            </TableCell>
            <TableCell align='left'>
              {formatAmount(remaining_amount)} {debit_fees.length > 0 && debit_fees[0].debit.currency.symbol}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    debit_fees: state.debits.debit_fees,
  };
};

export default connect(mapStateToProps)(Cuotas);
