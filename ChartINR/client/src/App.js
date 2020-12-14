import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { RangeProvider } from "./providers/RangeProvider";
import { LevelProvider } from "./providers/LevelProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <RangeProvider>
          <LevelProvider>
            {/* <Header /> */}
            <ApplicationViews />
          </LevelProvider>
        </RangeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

