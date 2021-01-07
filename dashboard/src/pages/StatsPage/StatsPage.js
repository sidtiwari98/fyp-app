import React, { useState } from 'react';
import TabNav from '../../components/TabNav/TabNav';
import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart'
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabNav/TabPanel'
import './statsPage.css'
import { LineChartData1Month, LineChartData3Month, PieChartColors, PieChartData1Month, PieChartData3Month } from '../../static/constants'
import { Line } from 'recharts'

export default function StatsPage(props) {
    const [value, setValue] = React.useState(0);
    const [LineChartData, setLineChartData] = useState(LineChartData1Month);
    const [PieChartData, setPieChartData] = useState(PieChartData1Month);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
        if (newValue === 1) {
            setLineChartData(LineChartData3Month)
            setPieChartData(PieChartData3Month)
        }
        else {
            setLineChartData(LineChartData1Month)
            setPieChartData(PieChartData1Month)
        }
    };

    function Graphs() {
        return (
            <div className="chart_container">
                <div className="graph_container">
                    <LineChart data={LineChartData} width={800} height={500} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} XaxisDataKey={"name"}>
                        <Line type="monotone" dataKey="Current_Shop" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Average_of_All_Shops_in_MTR" stroke="#82ca9d" />
                    </LineChart>
                    <span className="chart_heading">Violations of current Shop vs Average of All MTR Stations</span>
                </div>
                <div className="graph_container">
                    <PieChart data={PieChartData} color={PieChartColors} radius={200} width={500} height={500} nameKey={"name"}
                        dataKey={"value"} />
                    <span className="chart_heading">Contributions to Violation</span>
                </div>
            </div>
        )
    }
    return (
        <DefaultLayout>
            <div className="main_contianer">
                <TabNav value={value} handleChange={handleChange} >
                    <Tab label="1 Month" />
                    <Tab label="3 Months" />
                </TabNav>
                <TabPanel value={value} index={0}>
                    <Graphs />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Graphs />
                </TabPanel>
            </div>
        </DefaultLayout>
    );
}