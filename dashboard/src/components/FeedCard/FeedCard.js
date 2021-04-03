import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: '350px',
      border: '1px solid grey',
      margin: '5%'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 22,
      color: 'red',
      textAlign: 'center'
    },
    pos: {
      marginBottom: 12,
    },
  });


export default function FeedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          !Violation!
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <strong>Violation type: </strong>{props.alertType}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <strong>Time: </strong>{props.timeStamp}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <strong>Tag ID: </strong>{props.tagID}
        </Typography>
        {props.alertType === 'Speed Violation' && 
        <div>
          <Typography className={classes.pos} color="textSecondary">
            <strong>Previous Tag ID: </strong>{props.previoustagID}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <strong>Speed: </strong>{props.speed} m/s
          </Typography>
        </div>
        }
      </CardContent>
    </Card>
  );
}