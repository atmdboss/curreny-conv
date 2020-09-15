import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { ratesType, currencyTypes } from "../types";
import { checkIfNum, modNum, possibilities, tryingFunc } from "../helpers";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

type ExchangeProps = {
  currency: string[];
  rates: ratesType;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const Exchange: FunctionComponent<ExchangeProps> = ({ currency, rates }) => {
  const classes = useStyles();
  const [currChange, setCurrChange] = useState({
    change: "USD" as currencyTypes,
    get: "UAH" as currencyTypes,
  });
  const [moneyChange, setMoneyChange] = useState({ change: "", get: "" });
  const [curRate, setCurRate] = useState({
    buy: "",
    sale: "",
    ccy: "",
    base_ccy: "",
  });

  useEffect(() => {
    const currentCurrency = `${currChange.change}/${currChange.get}`;
    const currToSet = rates.find((rate) => {
      return (
        `${rate.ccy}/${rate.base_ccy}` === currentCurrency ||
        `${rate.base_ccy}/${rate.ccy}` === currentCurrency
      );
    }) || {
      ccy: "",
      base_ccy: "",
      buy: "",
      sale: "",
    };
    setCurRate(currToSet);
  }, [rates, currChange]);

  useEffect(() => {
    let result;
    if (moneyChange.change) {
      if (curRate.ccy === currChange.change) {
        // use buy rate
        result = Number(moneyChange.change) * Number(curRate.buy);
        setMoneyChange({ ...moneyChange, get: modNum(result.toString()) });
      } else {
        // use sell rate
        result = Number(moneyChange.change) / Number(curRate.sale);
        setMoneyChange({ ...moneyChange, get: modNum(result.toString()) });
      }
    } else if (moneyChange.get) {
      if (curRate.base_ccy === currChange.get) {
        // use buy rate
        result = Number(moneyChange.get) * Number(curRate.buy);
        setMoneyChange({ ...moneyChange, change: modNum(result.toString()) });
      } else {
        // use sell rate
        result = Number(moneyChange.get) / Number(curRate.sale);
        setMoneyChange({ ...moneyChange, change: modNum(result.toString()) });
      }
    }
    // eslint-disable-next-line
  }, [curRate, currChange]);

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // 1. know who is being changed
    const whoIsChanging = {
      name: e.target.name,
      value: e.target.value as currencyTypes,
    };
    const otherGuy = Object.entries(currChange).reduce(
      (accumulator, currentVal) => {
        if (currentVal[0] !== e.target.name) {
          accumulator.name = currentVal[0];
          accumulator.value = currentVal[1];
        }
        return accumulator;
      },
      { name: "", value: "" as currencyTypes }
    );

    const tries = [
      `${whoIsChanging.value}/${otherGuy.value}`,
      `${otherGuy.value}/${whoIsChanging.value}`,
    ];

    const matchFound = tryingFunc(tries, whoIsChanging);
    // if match is NOT found, find a match for whoIsChanging and use the other value to change otherGuy
    if (matchFound) {
      setCurrChange({
        ...currChange,
        [whoIsChanging.name]: whoIsChanging.value,
      });
    } else {
      // first find a match
      const match = possibilities[whoIsChanging.value][0];
      const smth = match.split("/").find((val) => val !== whoIsChanging.value);
      setCurrChange({
        [whoIsChanging.name]: whoIsChanging.value,
        [otherGuy.name]: smth,
      });
    }
  };

  const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNumber = checkIfNum(e.target.value);
    if (
      isNumber &&
      moneyChange[e.target.name as "change" | "get"].length < 11
    ) {
      const whoChanged = { name: e.target.name, value: e.target.value };
      const otherGuy = Object.entries(moneyChange).reduce(
        (accumulator, currentVal) => {
          if (currentVal[0] !== e.target.name) {
            accumulator.name = currentVal[0];
            accumulator.value = currentVal[1];
          }
          return accumulator;
        },
        { name: "", value: "" }
      );

      let result: number;
      if (whoChanged.name === "change") {
        if (currChange.change === curRate.ccy) {
          result = Number(whoChanged.value) * Number(curRate.buy);
        } else {
          result = Number(whoChanged.value) / Number(curRate.sale);
        }
      } else {
        if (currChange.get === curRate.base_ccy) {
          result = Number(whoChanged.value) / Number(curRate.sale);
        } else {
          result = Number(whoChanged.value) * Number(curRate.buy);
        }
      }
      setMoneyChange({
        ...moneyChange,
        [whoChanged.name]: whoChanged.value,
        [otherGuy.name]: modNum(result.toString()),
      });
    }
  };

  const flipper = () => {
    const { change, get } = currChange;
    setCurrChange({ change: get, get: change });
  };

  return (
    <Box marginY="2rem">
      <Grid container>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Change"
            variant="outlined"
            onChange={handleMoneyChange}
            type="text"
            value={moneyChange.change}
            name="change"
          />

          <FormControl className={classes.formControl}>
            <Select
              onChange={handleCurrencyChange}
              value={currChange.change}
              name="change"
              displayEmpty
            >
              {currency.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <IconButton role="switch-btn" onClick={flipper}>
            <SwapHorizIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            label="Get"
            variant="outlined"
            onChange={handleMoneyChange}
            type="text"
            value={moneyChange.get}
            name="get"
          />
          <FormControl className={classes.formControl}>
            <Select
              onChange={handleCurrencyChange}
              value={currChange.get}
              name="get"
              displayEmpty
            >
              {currency.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Exchange;
