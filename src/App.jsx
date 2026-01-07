import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ExamEditor from "./components/ExamEditor";
import ExamAttend from "./components/ExamAttend";
import ScoreView from "./components/ScoreView";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setUser(data))
      .catch(() => {});
  }, []);

  if (!user) {
    return view === "register"
      ? <RegisterForm onSwitch={() => setView("login")} />
      : <LoginForm onSuccess={setUser} onSwitch={() => setView("register")} />;
  }

  if (user.role === "teacher") {
    return (
      <>
        <ExamEditor />
        <ScoreView />
      </>
    );
  }

  return <ExamAttend />;
}
