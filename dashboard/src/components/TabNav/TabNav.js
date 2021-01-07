import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function TabNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={props.value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {props.children}
      </Tabs>
    </Paper>
  );
}
