import { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function findPath(a, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (a === obj[key]) return key;
        else if (obj[key] && typeof obj[key] === "object") {
          var path = findPath(a, obj[key]);
          if (path) return key + "." + path;
        }
      }
    }
  }
  const query = {
    user: {
      id: 1,
      name: {
        firstName: "James",
        lastName: "Ibori"
      },
      location: {
        city: "Ikoyi",
        state: "Lagos",
        address: "One expensive house like that"
      }
    }
  };
  const handleSearch = () => {
    setError("");
    setSuccess("");
    if (input.length < 1) {
      setError("Make an Input");
      return;
    }
    const path = findPath(input, query);
    if (!path) {
      return setError("No path found");
    }
    setSuccess(`query.${path}`);
  };

  return (
    <div className="App">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSearch}> Search</button>

      <p>{error.length > 0 && error}</p>
      <p> {success.length > 0 && success}</p>
    </div>
  );
}
