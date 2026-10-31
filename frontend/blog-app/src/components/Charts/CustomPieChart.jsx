import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({
  data = [],
  colors = [],
  height = "100%",
  innerRadius = "58%",
  outerRadius = "78%",
}) => {
  return (
    <div className="h-full w-full min-w-0">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart
          margin={{
            top: 8,
            right: 8,
            bottom: 8,
            left: 8,
          }}
        >
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="white"
            strokeWidth={3}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              outline: "none",
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            content={<CustomLegend />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
