import React, { useEffect, useState } from "react";

export default function ExamAttend() {
  const [sets, setSets] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("/api/questionset", { credentials: "include" })
      .then(r => r.json())
      .then(setSets);
  }, []);

  const submit = async id => {
    await fetch(`/api/submit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        answers: Object.entries(answers).map(([qid, response]) => ({
          questionId: qid,
          response
        }))
      })
    });
  };

  return (
    <div>
      <h2>Available Exams</h2>
      {sets.map(s => (
        <div key={s.id}>
          <h4>{s.title}</h4>
          <button onClick={() => submit(s.id)}>Submit</button>
        </div>
      ))}
    </div>
  );
}
