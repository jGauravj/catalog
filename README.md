# Chart Application

This project is a React-based chart application showcasing a line chart with dynamic data updates. It uses random numbers to generate chart data and allows users to interact with the chart by selecting different time ranges.

## Tech Stack

- **React.js**: For building the user interface.
- **Vite**: Used to create and develop the React application.
- **Tailwind CSS**: For styling the components with a utility-first approach.
- **Recharts**: For rendering the chart visualization.
- **HTML**: As the backbone for structuring components.

## Features

- **Dynamic Chart Data**: Generates random data points for different time ranges (e.g., 1D, 3D, 1W, etc.).
- **State Lifting and Callbacks**: Used to manage and update the chart data and stats from the parent component (`App`) to the child component (`Chart`).
- **Price Statistics**: Displays the current price, price change, and percentage change above the chart.
- **Interactive Tabs**: Includes multiple tabs like Summary, Chart, Statistics, Analysis, and Settings for easy navigation.
- **Time Range Selection**: Allows users to filter the chart data by selecting predefined time ranges.

## Future Scope

This application is designed to be extendable. If required, the **Context API** can be integrated to manage the state globally and avoid prop drilling, especially when multiple components need access to shared state.



 
