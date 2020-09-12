import React, { FunctionComponent } from "react";
import { ratesType } from "../redux/ratesSlice";
type TableProps = {
  rates: ratesType;
};

const modNum = (numStr: string) => {
  const floatIndex = numStr.indexOf(".");
  const precisionNum = floatIndex > 0 ? numStr.slice(0, floatIndex).length + 1 : numStr.length;
  const num = Number(numStr).toPrecision(precisionNum);
  return num;
}

const Table: FunctionComponent<TableProps> = ({ rates }) => {
  // console.log(data);
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
          rates.map((curr, index) => {
            return (
              <tr key={index}>
                <td>{`${curr.ccy} / ${curr.base_ccy}`}</td>
                <td contentEditable={false}>{modNum(curr.buy)}</td>
                <td contentEditable={false}>{modNum(curr.sale)}</td>
              </tr>
            )
          })
          : null}
      </tbody>
    </table>
  );
};

export default Table;
