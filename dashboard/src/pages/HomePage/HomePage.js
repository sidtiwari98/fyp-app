import React, { useState, useEffect } from 'react';
import * as FirestoreService from '../../services/firestore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Chip, Divider,
    List,
    ListItem, ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {Link} from 'react-router-dom';
import { mtrData } from '../../static/constants';
import FeedCard from '../../components/FeedCard/FeedCard';
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MapIcon from '@material-ui/icons/Map';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
    linesDiv:{
        width: '70%',
        height: '500px',
        overflow: 'scroll',
        borderBlockEnd: '1px solid #808080',
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
        // borderLeft: '1px solid #808080',
        borderBlockEnd: '1px solid #808080',
        overflow: 'scroll',
        width: '400px',
    }
}));

export default function HomePage(props) {
    const classes = useStyles('blue');
    const [averageTimeList, setAverageTimeList] = useState(undefined)
    const [violationsList, setViolationsList] = useState([])

    useEffect(() => {
        const averageTimeUnsub = FirestoreService.getaverageTimeList((data) => {
                console.log(data)
                setAverageTimeList(data)
            })
        return () => {
            averageTimeUnsub()
        }
    }, [FirestoreService]);

    useEffect(() => {
        const violationListUnsub = FirestoreService.getViolationsList((data) => {
                console.log(data)
                setViolationsList(data)
            })
        return () => {
            violationListUnsub()
        }
    }, [FirestoreService]);

    return (
        <DefaultLayout title="Home">
            <div className={classes.mainContianer}>
            <h1 className = {classes.headingDashboard}>Welcome to your Dashboard</h1>
                <div className={classes.root}>
                    <div className = {classes.linesDiv}>
                        {Object.keys(mtrData).map((line) => {
                            return (
                                <Accordion className={classes.accordion}>
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
                                                            <ListItemIcon><FiberManualRecordIcon style={{
                                                                color: mtrData[line].color,
                                                                fontSize: 17,
                                                            }}/></ListItemIcon>
                                                            {/* <div className = {classes.stationsNamesContainer}> */}
                                                                <ListItemText>{station}</ListItemText>
                                                                <Link to = {`/home/${station}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                                <Button
                                                                    variant="contained"
                                                                    size="small"
                                                                    color="secondary"
                                                                    startIcon={<ShoppingCartIcon />}
                                                                >
                                                                    View Shops
                                                                </Button>
                                                                </Link>
                                                                <span style = {{paddingRight: '5px'}}/>
                                                                <Button
                                                                    variant="contained"
                                                                    size="small"
                                                                    color="default"
                                                                    startIcon={<MapIcon />}
                                                                >
                                                                    View Map
                                                                </Button>
                                                            {/* </div> */}
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
                    <div className = {classes.violationDiv}>
                        {violationsList.sort((a, b) => parseInt(a.time) < parseInt(b.time) ? 1 : -1).map((cardData, index)=>{
                            return (
                                <div key = {index}>
                                    <FeedCard 
                                    alertType = {cardData['isAreaViolation'] ? 'Area Violation' : 'Speed Violation'} 
                                    timeStamp = {new Date(cardData['time']).toLocaleString('default')}
                                    tagID = {cardData['tagID']}
                                    previoustagID = {!cardData['isAreaViolation'] && cardData['prevTagId']} 
                                    speed = {!cardData['isAreaViolation'] && parseFloat(cardData['speed']).toFixed(2)} 
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}