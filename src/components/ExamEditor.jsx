import React, { useState } from "react";

export default function ExamEditor() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = async q => {
    const res = await fetch("/api/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(q)
    });

    const saved = await res.json();
    setQuestions([...questions, saved.id]);
  };

  const createSet = async () => {
    await fetch("/api/questionset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        description: "",
        questions
      })
    });

    setTitle("");
    setQuestions([]);
  };

  return (
    <section>
      <h3>Create Exam</h3>
      <input placeholder="Exam Title" onChange={e => setTitle(e.target.value)} />

      <button onClick={() => addQuestion({ type: "short_answer", text: "Sample Question" })}>
        Add Question
      </button>

      <button onClick={createSet}>Publish Exam</button>
    </section>
  );
}
