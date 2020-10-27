import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Paper } from "@material-ui/core";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const SimpleTable = (props) => {
  const classes = useStyles2();
  return (
    <Paper>
      <Table className={classes.table} stickyHeader>
        {props.children}
      </Table>
    </Paper>
  );
};

export default SimpleTable;
