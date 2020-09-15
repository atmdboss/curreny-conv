import React from "react";
import SVG from "./ServerDownSVG";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    width: "90vw",
    height: "calc(100vh - 250px)",
  },
});

const SeverError = () => {
  const classes = useStyles();
  return (
    <Box marginX="auto" className={classes.container}>
      <SVG />
      <Typography component="h4" color="error">
        Too many requests. Please try again later
      </Typography>
    </Box>
  );
};

export default SeverError;
