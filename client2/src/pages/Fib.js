import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  async function fetchValues() {
    const { data } = await axios.get("/api/values/current");
    setValues(data);
  }

  async function fetchIndexes() {
    const { data } = await axios.get("/api/values/all");
    setSeenIndexes(data);
  }

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(", ");
  }

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  async function onSubmit(event) {
    event.preventDefault();

    await axios.post("/api/values", { index });

    setIndex("");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Enter your index:</label>

        <input
          type="text"
          value={index}
          onChange={e => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
}
