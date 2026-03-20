import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Employees from "./pages/Employee.jsx";
import "./index.css";

function App() {
  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 w-full lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="w-full">
          <Employees />
        </main>
      </div>
    </div>
  );
}

export default App;
