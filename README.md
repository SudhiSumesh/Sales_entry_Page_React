# React-Redux Sales Entry Project

This project is a Single Page Sales Entry front-end application built using ReactJS and Redux. It includes two sections, one for the header table and the other for the detail table.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Run the development server: `npm start`

## Project Structure

The project is structured as follows:

- `components/`: Contains React components for Header and Details sections.
- `Redux/`: Holds Redux-related files including actions, reducers, and the Redux store configuration.
- `utils/`: Includes utility functions such as validation.

## Components

### Header Component

The Header component allows users to enter information for the header table, including fields such as Invoice Number, Voucher Date, Customer Name, Amount, and Status.

### Details Component

The Details component allows users to enter data for multiple rows in the detail table. Each row includes fields for Item Code, Item Name, Description, Quantity, and Rate. Users can dynamically add or remove rows.

## Redux

The project uses Redux for state management. Actions and reducers are defined in the `Redux/` directory.


## Usage

The application provides a user interface for entering sales data. The header and detail information can be submitted to the specified API endpoints.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.