import React, { useEffect, useState } from "react";

export default function ScoreView() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch("/api/questionset", { credentials: "include" })
      .then(r => r.json())
      .then(setSets);
  }, []);

  return (
    <section>
      <h3>Results</h3>
      {sets.map(s => (
        <div key={s.id}>
          <strong>{s.title}</strong>
          <a href={`/api/results/${s.id}`} target="_blank" rel="noreferrer">
            View Results
          </a>
        </div>
      ))}
    </section>
  );
}
