import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { RangeProvider } from "./providers/RangeProvider";
import { LevelProvider } from "./providers/LevelProvider";
import { ReminderProvider } from "./providers/ReminderProvider";
import { WarfarinUserProvider } from "./providers/WarfarinUserProvider";
import { DoseProvider } from './providers/DoseProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <WarfarinUserProvider>
          <DoseProvider>
            <RangeProvider>
              <ReminderProvider>
                <LevelProvider>
                  {/* <Header /> */}
                  <ApplicationViews />
                </LevelProvider>
              </ReminderProvider>
            </RangeProvider>
          </DoseProvider>
        </WarfarinUserProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

