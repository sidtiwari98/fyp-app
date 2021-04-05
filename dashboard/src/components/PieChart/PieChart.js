import React from 'react';
import {
  PieChart, Pie, Cell
} from 'recharts';


const Piechart = React.memo(props => {
  const data = props.data;
  const COLORS = props.color;

  const renderCustomizedLabel = ({
                                   cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
                                 }) => {
    const RADIAN = Math.PI / 180;
    const radius = 20 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  }
  return (
      <PieChart width={props.width} height={props.height}>
        <Pie
          data={data}
          cx={props.width/2}
          cy={props.width/2}
          labelLine={false}
          label = {renderCustomizedLabel}
          nameKey={props.nameKey}
          outerRadius={props.radius}
          fill="#8884d8"
          dataKey={props.dataKey}
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
  );
})

export default Piechart