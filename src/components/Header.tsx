import React from "react";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    height: "100px",
    // textAlign:"center",
    width: "100%",
    lineHeight: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "50px",
    height: "50px",
    marginLeft: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    flexGrow: 1,
    fontSize: "2.5rem",
    marginRight: "10px",
    background: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    backgroundClip: "text",
    color: "transparent",
    backgroundSize: "200%",
    animation: "$gradient 2s ease infinite alternate",
  },
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0%",
    },
    "100%": {
      backgroundPosition: "100%",
    },
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.header}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src="https://png2.cleanpng.com/sh/084e894a8d018f22ad111742467a6b9c/L0KzQYm3WcI4N6F3i5H0aYP2gLBuTfZwepZuf9C2ZYjmeLL1hBUudZJ3g9d9LXP4gsPsjvN6NZZ9e9pqbnfoPcPolPUua51uRdt3dHX1frL7if9vaZ0yiNNEbXXxhMS0kBNpbZV6hNc2YT3mcb3zTfN2eqNqhtVELUXlcbW8WPRjPmUAeqUBLkm3QYa8UsA1OWY4UKIDN0G2QYW4UsEveJ9s/kisspng-foreign-exchange-market-currency-exchange-rate-cli-international-payments-schedule-a-call-currency-5bad58db649b36.9415520415380871314121.png"
            alt="forex logo"
          />
        </div>

        <Typography className={classes.text} component="span">
          Currency Exchange
        </Typography>
      </Box>
      <Divider variant="fullWidth" />
    </>
  );
};

export default Header;
