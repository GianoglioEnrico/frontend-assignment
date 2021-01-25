import React from "react";
import "./App.css";
import Content from "./container/Content";
import NavigationHeader from "./components/NavigationHeader";

function App() {
  return (
    <div className="App">
      <NavigationHeader />
      <Content />
    </div>
  );
}

export default App;
