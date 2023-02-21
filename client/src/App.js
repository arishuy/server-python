import React from 'react'
import { BrowserRouter} from "react-router-dom";
import Routes from "../src/routes/routes";

const App = () => {
    return (
    <BrowserRouter>
    <div className="App">
      <div className="container">
        <div className="main">
          <Routes />
        </div>
      </div>
    </div>
  </BrowserRouter>

    )
}

export default App