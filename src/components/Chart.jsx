import { useEffect, useState } from "react";
import { Maximize2, CirclePlus } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define available time ranges for the chart with corresponding labels and day counts ->
const timeRanges = {
  "1d": { days: 1, label: "1D" },
  "3d": { days: 3, label: "3D" },
  "1w": { days: 7, label: "1W" },
  "1m": { days: 30, label: "1M" },
  "6m": { days: 180, label: "6M" },
  "1yr": { days: 365, label: "1Y" },
  max: { days: 360, label: "MAX" },
};

const Chart = ({ onUpdateData }) => {
  // State for selected time range and chart data
  const [selectedRange, setSelectedRange] = useState("1m"); // Default to "1M"
  const [chartData, setChartData] = useState([]); // Holds data points for the chart

  // Generate dummy data for the chart based on the number of days in the selected range
  const generateData = (days) => {
    const data = [];
    const basePrice = 63000; // Set a base price for data generation
    const now = new Date(); // Current date as a reference point

    // Generate data points for the specified number of days
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i); // Subtract i days from current date
      data.push({
        timestamp: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        price: basePrice + Math.random() * 5000 - 2500, // Add randomness to price
      });
    }
    return data;
  };

  // Update the chart with new data when a time range is selected
  const updateChart = (range) => {
    setSelectedRange(range); // Update the selected range state
    const newData = generateData(timeRanges[range].days); // Generate new data
    setChartData(newData); // Update chart data state
    onUpdateData(newData); // Notify parent component about updated data
  };

  // Effect to load default data when the component mounts
  useEffect(() => {
    updateChart("1m"); // Default to "1M" time range on mount
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-6 flex md:flex-row flex-col md:items-center gap-2 items-end md:justify-between mb-4">
        <div className="flex justify-start items-center md:gap-10 gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>
              <Maximize2 className="text-gray-600 md:w-5 md:h-5 w-4 h-4 " />
            </span>
            <h1 className="md:text-sm text-xs font-medium text-gray-600">
              Fullscreen
            </h1>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <span>
              <CirclePlus className="text-gray-600 md:w-5 md:h-5 w-4 h-4" />
            </span>
            <h1 className="md:text-sm text-xs font-medium text-gray-600">
              Compare
            </h1>
          </div>
        </div>

        <div className="flex md:gap-2 gap-1">
          {Object.entries(timeRanges).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => updateChart(key)}
              className={`md:px-3 px-2 md:text-sm text-xs py-1 rounded ${
                selectedRange === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Chart container */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            {/* Define gradient for area chart fill */}
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* X-axis configuration */}
            <XAxis
              dataKey="timestamp"
              tickFormatter={
                (timestamp) => new Date(timestamp).toLocaleDateString() // Format dates for display
              }
              fontSize={12}
            />
            {/* Y-axis configuration */}
            <YAxis
              domain={["dataMin - 1000", "dataMax + 1000"]} // Dynamically adjust range
              tickFormatter={(value) => `$${value.toLocaleString()}`} // Format values as currency
              fontSize={12}
            />
            {/* Tooltip configuration */}
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            {/* Area configuration */}
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6" // Line color
              fillOpacity={1}
              fill="url(#colorPrice)" // Use defined gradient
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
