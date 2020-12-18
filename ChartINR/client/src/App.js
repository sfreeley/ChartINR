import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { RangeProvider } from "./providers/RangeProvider";
import { LevelProvider } from "./providers/LevelProvider";
import { ReminderProvider } from "./providers/ReminderProvider";
import { WarfarinUserProvider } from "./providers/WarfarinUserProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <WarfarinUserProvider>
          <RangeProvider>
            <ReminderProvider>
              <LevelProvider>
                {/* <Header /> */}
                <ApplicationViews />
              </LevelProvider>
            </ReminderProvider>
          </RangeProvider>
        </WarfarinUserProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

