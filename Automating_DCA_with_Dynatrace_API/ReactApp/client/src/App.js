import React, { useState } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Results from "./components/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import { options } from "./constants/options";

function App() {
  const [selected, setSelected] = useState(options[0]);
  const [tenant, setTenant] = useState("");
  const [token, setToken] = useState("");
  // results
  return (
    <div className="App">
      <Topbar props={{ selected, setSelected }} />
      <Results props={{ selected, tenant, token, setTenant, setToken }} />
    </div>
  );
}

export default App;
