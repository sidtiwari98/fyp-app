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
    }
}));

export default function HomePage() {
    const classes = useStyles('blue');
    const [currentTagData, setCurrentTagData] = useState(undefined)
    const [violationsList, setViolationsList] = useState([])

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
        })
        return () => {
            violationListUnsub()
        }
    }, []);

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
                        {violationsList.sort((a, b) => parseInt(a.time) < parseInt(b.time) ? 1 : -1).map((cardData, index) => {
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
                        })}
                    </div>
                </div>
                <Divider variant="middle"/>
                <div style={{height: "100%", width: "100%"}}>
                    <Map currentTagData={currentTagData}/>
                </div>
            </div>
        </DefaultLayout>
    );
}