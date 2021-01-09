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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "column",
        padding: 25
    },
    accordion: {
        width: "100%",
    },
    list: {
        flexGrow: 1
    },
    background: {},
}));

export default function HomePage(props) {
    const classes = useStyles('blue');

    return (
        <DefaultLayout title="Home">
            <div className={classes.root}>
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
                                                    <ListItemText>{station}</ListItemText>
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
        </DefaultLayout>
    );
}