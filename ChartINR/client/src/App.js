import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>

        {/* <Header /> */}
        <ApplicationViews />

      </UserProfileProvider>
    </Router>
  );
}

export default App;

