import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../static/images/MTR_logo.png'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    margin: theme.spacing(0, 1, 0, -1),
    height: "50px",
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#F14C38" }} position="static">
        <Toolbar>
          <img src={logo} alt="logo" className={classes.image}></img>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {
            props.notLogin !== true && <Button onClick={() => history.push("/")}color="inherit">Log Out</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}