import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  
  const [msg, setMsg] = useState("We are CISCO");
  
  const path = localStorage.getItem("path")

  useEffect(()=>{
    fetch(`/codechecker/report/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {path:path}
    }).then((res) => {
      const resp = res.json();
      setMsg(resp.clue)
    })
  })
  
  return (
    <div className="App">
      {msg}
    </div>
  );
}

export default App;
