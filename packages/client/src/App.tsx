import React from "react";
import "./App.css";

// Header and Application's Container imports
import FullPageContainer from "./container/FullPageContainer";
import NavigationHeader from "./components/navigationHeader";

function App() {
  return (
    <div className="App">
      <NavigationHeader />
      <FullPageContainer />
    </div>
  );
}

export default App;
