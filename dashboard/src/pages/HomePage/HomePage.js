import React, {useState, useEffect} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Chip, Divider, IconButton,
    List,
    ListItem, ListItemIcon, ListItemSecondaryAction,
    ListItemText, Tooltip,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MapIcon from '@material-ui/icons/Map';
import {mtrData} from '../../static/constants';
import * as FirestoreService from '../../services/firestore';
import FeedCard from '../../components/FeedCard/FeedCard';
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import Map from "../../components/Map";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: "row",
        padding: 25,
    },
    mainContianer: {
        padding: '1%',
    },
    headingDashboard: {
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif'
    },
    linesDiv: {
        width: '70%',
        height: '500px',
        overflow: 'scroll',
    },
    accordion: {
        width: "100%",
    },
    list: {
        flexGrow: 1
    },
    background: {},
    violationDiv: {
        marginLeft: '30px',
        height: '500px',
        overflow: 'scroll',
        width: '400px',
    },
    noViolations: {
        display: 'flex',
        marginLeft: '30px',
        height: '500px',
        width: '400px',
        alignItems: 'center',
        fontSize: '32px',
    }
}));

export default function HomePage() {
    const classes = useStyles('blue');
    const [currentTagData, setCurrentTagData] = useState(undefined)
    const [violationsList, setViolationsList] = useState([])
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const averageTimeUnsub = FirestoreService.getCurrentTagData((data) => {
            setCurrentTagData(data)
        })
        return () => {
            averageTimeUnsub()
        }
    }, []);

    useEffect(() => {
        const violationListUnsub = FirestoreService.getViolationsList((data) => {
            setViolationsList(data)
            if (data.length > 0){
                handleClick()
            }
        })
        return () => {
            violationListUnsub()
        }
    }, []);

    const handleClick = () => {
        setOpen(true);
      };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    return (
        <DefaultLayout title="Home">
            <div className={classes.mainContianer}>
                <h1 className={classes.headingDashboard}>Welcome to your Dashboard</h1>
                <div className={classes.root}>
                    <div className={classes.linesDiv}>
                        {Object.keys(mtrData).map((line) => {
                            return (
                                <Accordion className={classes.accordion} key={line}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Chip label={<Typography>{line}</Typography>}
                                              style={{backgroundColor: mtrData[line].color, color: 'white'}}/>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List className={classes.list}>
                                            {mtrData[line].stations.map((station) => {
                                                return (
                                                    <>
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <FiberManualRecordIcon style={{
                                                                    color: mtrData[line].color,
                                                                    fontSize: 17,
                                                                }}/>
                                                            </ListItemIcon>
                                                            <div className={classes.stationsNamesContainer}>
                                                                <ListItemText>{station}</ListItemText>
                                                                <ListItemSecondaryAction>
                                                                    <Link to={`/home/${station}`} style={{
                                                                        textDecoration: 'none',
                                                                        color: 'black'
                                                                    }}>
                                                                        <Tooltip title="View Shops">
                                                                            <IconButton>
                                                                                <ShoppingCartIcon/>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Link>
                                                                    <Tooltip title="View Map">
                                                                        <IconButton onClick={() => document.getElementById('canvas').scrollIntoView({behavior: "smooth"})}>
                                                                            <MapIcon/>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </ListItemSecondaryAction>
                                                            </div>
                                                        </ListItem>
                                                        <Divider/>
                                                    </>
                                                )
                                            })}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                    <div className={classes.violationDiv}>
                                    {violationsList.length ===0 ?
                                        <div className = {classes.noViolations}>
                                            No Violations for today
                                        </div>
                                    :
                                        violationsList.sort((a, b) => parseInt(a.time) < parseInt(b.time) ? 1 : -1).map((cardData, index) => {
                                            return (
                                                <div key={index}>
                                                    <FeedCard
                                                        alertType={cardData['isAreaViolation'] ? 'Area Violation' : 'Speed Violation'}
                                                        timeStamp={new Date(cardData['time']).toLocaleString('default')}
                                                        tagID={cardData['tagID']}
                                                        previoustagID={!cardData['isAreaViolation'] && cardData['prevTagId']}
                                                        speed={!cardData['isAreaViolation'] && parseFloat(cardData['speed']).toFixed(2)}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                                </div>
                </div>
                <Divider variant="middle"/>
                <div style={{height: "100%", width: "100%"}}>
                    <Map currentTagData={currentTagData}/>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="ALERT: A Violation has been detected."
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </DefaultLayout>
    );
}