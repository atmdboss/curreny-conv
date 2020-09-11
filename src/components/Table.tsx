import React, { FunctionComponent } from "react";
import { currType } from "../redux/currencySlice";
type TableProps = {
  data: currType;
};

const modNum = (numStr: string) => {
  const floatIndex = numStr.indexOf(".");
  const precisionNum = numStr.slice(0, floatIndex).length + 1;
  const num = Number(numStr).toPrecision(precisionNum);
  return num;
}

const Table: FunctionComponent<TableProps> = ({ data }) => {
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
        {data.length ?
          data.map((curr, index) => {
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
