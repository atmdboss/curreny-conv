import React, { FunctionComponent, useState } from "react";
import { ratesType } from "../types";
import TableData from "./TableData";

type TableProps = {
  rates: ratesType;
};

const Table: FunctionComponent<TableProps> = ({ rates }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Currency/Current Date</th>
          <th>Buy</th>
          <th>Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates.length ?
          rates.map((curr) => {
            return (
              <tr key={`${curr.ccy} / ${curr.base_ccy}`}>
                  <td>{`${curr.ccy} / ${curr.base_ccy}`}</td>
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
              </tr>
            )
          })
          : null}
      </tbody>
    </table>
  );
};

export default Table;
