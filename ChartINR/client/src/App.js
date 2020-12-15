import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { RangeProvider } from "./providers/RangeProvider";
import { LevelProvider } from "./providers/LevelProvider";
import { WarfarinUserProvider } from "./providers/WarfarinUserProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <WarfarinUserProvider>
          <RangeProvider>
            <LevelProvider>
              {/* <Header /> */}
              <ApplicationViews />
            </LevelProvider>
          </RangeProvider>
        </WarfarinUserProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

