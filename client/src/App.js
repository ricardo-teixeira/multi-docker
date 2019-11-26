import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Fib from "./pages/Fib";
import OtherPage from "./pages/OtherPage";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
      </header>
      <div>
        <Route exact path="/" component={Fib} />
        <Route exact path="/otherpage" component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
