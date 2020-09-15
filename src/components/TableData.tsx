import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { rateUpdate } from "../types";
import store from "../redux/store";
import { updateRate } from "../redux/ratesSlice";
import { checkIfNum, modNum } from "../helpers";

import TableCell from "@material-ui/core/TableCell";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

type TableDataProps = rateUpdate;

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

const TableData: FunctionComponent<TableDataProps> = ({
  ccy,
  baseCcy,
  value,
  type,
}) => {
  const [newRate, setNewRate] = useState("0");
  const [editing, setEditing] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [newValues, setNewValues] = useState({ posTen: "0", negTen: "0" });

  useEffect(() => {
    setNewRate(value);
    const tenPercent = 0.1 * Number(value);
    const posTen = Number(value) + tenPercent;
    const negTen = Number(value) - tenPercent;
    setNewValues({
      posTen: modNum(posTen.toString()),
      negTen: modNum(negTen.toString()),
    });
    // eslint-disable-next-line
  }, []);
  const handleChange = (e: ChangeEvent) => {
    if (checkIfNum(e.target.value)) {
      if (
        newValues.posTen === e.target.value ||
        newValues.negTen === e.target.value
      ) {
        setHasError(false);
      } else {
        setHasError(true);
      }
      setNewRate(e.target.value);
    }
  };
  const handleClick = () => {
    setEditing(true);
  };
  const handleSave = () => {
    if (newRate === newValues.posTen || newRate === newValues.negTen) {
      setHasError(false);
      store.dispatch(updateRate({ type, ccy, baseCcy, value: newRate }));
      setEditing(false);
    } else {
      setHasError(true);
    }
  };
  const handleCancel = () => {
    setNewRate(value);
    setEditing(false);
    setHasError(false);
  };
  return (
    <StyledTableCell align="right">
      {!editing && (
        <IconButton role="edit-btn" onClick={handleClick}>
          <EditIcon />
        </IconButton>
      )}
      {editing ? (
        <div>
          <TextField
            value={newRate}
            helperText={`Possible values must be +10% or -10% of original value`}
            variant="outlined"
            onChange={handleChange}
          />
          <IconButton role="save-btn" disabled={hasError} onClick={handleSave}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton role="cancel-btn" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        newRate
      )}
    </StyledTableCell>
  );
};

export default TableData;
