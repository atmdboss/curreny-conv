import React, { FunctionComponent } from "react";
import { ratesType } from "../types";
import TableData from "./TableData";

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

type TableProps = {
  rates: ratesType;
};
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const CustomTable: FunctionComponent<TableProps> = ({ rates }) => {
  return (
    <Grid container>
      <Box marginX="auto" marginY="1rem" width="95vw">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{new Date().toDateString()}</StyledTableCell>
                  <StyledTableCell align="right">Buy</StyledTableCell>
                  <StyledTableCell align="right">Sell</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates.length
                  ? rates.map((curr) => {
                      return (
                        <StyledTableRow key={`${curr.ccy} / ${curr.base_ccy}`}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                          >{`${curr.ccy} / ${curr.base_ccy}`}</StyledTableCell>
                          <TableData
                            type="buy"
                            ccy={curr.ccy}
                            baseCcy={curr.base_ccy}
                            value={curr.buy}
                          />

                          <TableData
                            type="sale"
                            ccy={curr.ccy}
                            baseCcy={curr.base_ccy}
                            value={curr.sale}
                          />
                        </StyledTableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CustomTable;
