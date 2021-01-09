import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles({
  root: {
    width: "50%",
  },
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  }
});

export default function TabNav(props) {
  const classes = useStyles();
 
  return (
    <div className = {classes.container}>
    <Paper className={classes.root}>
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {props.children}
      </Tabs>
    </Paper>
    </div>
  );
}
