import React from 'react';
import {
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const LineCharts = React.memo(props => {
  return (
      <LineChart
        width={props.width}
        height={props.height}
        data={props.data}
        margin={props.margin}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={props.XaxisDataKey}/>
        {/* <YAxis dataKey={props.YaxisDataKey}/> */}
        <YAxis />
        <Tooltip/>
        <Legend/>
        {props.children}
      </LineChart>
  );
})

export default LineCharts