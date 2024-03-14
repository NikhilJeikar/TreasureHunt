import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  const [msg, setMsg] = useState("We are CISCO");

  let path = JSON.parse(localStorage.getItem("path"));
  let timing = JSON.parse(localStorage.getItem("timing"));

  useEffect(() => {
    fetch(`/codechecker/report/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { path: path },
    }).then((res) => {
      const resp = res.json();
      setMsg(resp.clue);
      if (resp.status) {
        path.push(id);
        localStorage.setItem("path", path);
        timing.push({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem("timing", timing);
      }
    });
  });

  return (
    <div className="App">
      <div>{msg}</div>
      <div>
        {msg === "You have completed"
          ? timing.map((value, ind) => {
              return (
                <div>
                  <div>{`${ind} found at ${value.date} ${value.time}`}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
