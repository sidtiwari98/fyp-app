import React from 'react';
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Chip, Divider,
    List,
    ListItem, ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {mtrData} from "../../static/constants";
import {Link} from 'react-router-dom'
import {FeedCardData} from '../../static/constants'
import FeedCard from '../../components/FeedCard/FeedCard';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "row",
        padding: 25
    },
    mainContianer: {
        padding: '1%'
    },
    headingDashboard: {
        textAlign: 'center'
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
        width: '400px'
    }
}));

export default function HomePage(props) {
    const classes = useStyles('blue');

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
                                                                fontSize: 17
                                                            }}/></ListItemIcon>
                                                            <ListItemText><Link to = {`/home/${station}`} style={{ textDecoration: 'none', color: 'black' }}>{station}</Link></ListItemText>
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
                            {FeedCardData.map((cardData, index)=>{
                                return(
                                    <FeedCard 
                                    key = {index}
                                    alertType = {cardData['isAreaViolation'] ? 'Area Violation' : 'Speed Violation'} 
                                    timeStamp = {cardData['time']}
                                    tagID = {cardData['tagID']}
                                    previoustagID = {!cardData['isAreaViolation'] && cardData['prevTagId']} 
                                    speed = {!cardData['isAreaViolation'] && cardData['speed']} 
                                    />
                                )
                            })}
                        </div>
                </div>
            </div>
        </DefaultLayout>
    );
}