import React from 'react';
import AppContainer from './components/AppContainer';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AppContainer />
      </Router>
    </div>
  )
}

export default App;
