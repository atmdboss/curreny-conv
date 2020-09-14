import React from "react";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      height: "100px",
      textAlign: "center",
      width: "100%",
      lineHeight: "100px",
      backgroundColor: theme.palette.grey[100],
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Divider variant="fullWidth" />
      <Typography component="span">
        &copy;{new Date().getFullYear()}, All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
