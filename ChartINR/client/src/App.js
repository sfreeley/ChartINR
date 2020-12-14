import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { RangeProvider } from "./providers/RangeProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <RangeProvider>
          {/* <Header /> */}
          <ApplicationViews />
        </RangeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

