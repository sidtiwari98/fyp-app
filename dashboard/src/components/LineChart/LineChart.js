import React from 'react';
import {
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const LineCharts = React.memo(props => {

  // go to https://recharts.org/en-US/ to add more props here and components here
  // the customability of this component will change as the project requirements change
  return (
    <ResponsiveContainer height = {400} width="100%" >
      <LineChart
        width={props.width}
        height={props.height}
        data={props.data}
        margin={props.margin}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={props.XaxisDataKey}/>
        <YAxis dataKey={props.YaxisDataKey}/>
        <Tooltip/>
        <Legend/>
        {props.children}
      </LineChart>
    </ResponsiveContainer>
  );
})

export default LineCharts