import { useState } from "react";
import Chart from "./components/Chart";

const App = () => {
  // Define the navigation tabs for the application
  const Tab_Buttons = [
    { key: "Summary", label: "Summary" },
    { key: "Chart", label: "Chart" },
    { key: "Statistics", label: "Statistics" },
    { key: "Analysis", label: "Analysis" },
    { key: "Settings", label: "Settings" },
  ];

  // State to track the active tab; default is Chart
  const [activeTab, setActiveTab] = useState(Tab_Buttons[1].key);

  // State to manage price statistics displayed at the top of the page
  const [priceStats, setPriceState] = useState({
    currentPrice: 0,
    priceChange: 0, // Absolute change in price
    priceChangePercent: 0,
  });

  // Function to update price statistics when chart data changes
  const updatePriceState = (data) => {
    if (data.length > 0) {
      const priceChange = data[data.length - 1].price - data[0].price; // Calculate price change
      const priceChangePercent = (priceChange / data[0].price) * 100; // Calculate percentage change
      setPriceState({
        currentPrice: data[data.length - 1].price, // Update current price
        priceChange,
        priceChangePercent,
      });
    }
  };

  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <div>Summary content goes here.</div>;
      case "Chart":
        return <Chart onUpdateData={updatePriceState} />;
      case "Statistics":
        return <div>Statistics content goes here.</div>;
      case "Analysis":
        return <div>Analysis content goes here.</div>;
      case "Settings":
        return <div>Settings content goes here.</div>;
      default:
        return <div>Select a tab to view its content.</div>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen flex items-center">
      <div className="w-full h-full border p-4 border-gray-200 rounded-md shadow-sm shadow-black/30">
        <div className="mb-6">
          {/* Display current price with 2 decimal places */}
          <div className="text-3xl font-bold">
            $
            {priceStats.currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          {/* Display price change and percentage, color-coded based on positive/negative value */}
          <div
            className={`text-lg ${
              priceStats.priceChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {priceStats.priceChange >= 0 ? "+" : ""}
            {priceStats.priceChange.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({priceStats.priceChangePercent.toFixed(2)}%)
          </div>
        </div>

        <div className="flex justify-center sm:justify-start border-b mb-4">
          {Tab_Buttons.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`sm:px-4 px-2 sm:py-3 py-2 sm:text-sm text-xs font-medium ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default App;
