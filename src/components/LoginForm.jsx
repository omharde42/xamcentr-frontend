import React, { useState } from "react";

export default function LoginForm({ onSuccess, onSwitch }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    const profile = await fetch("/api/profile", {
      credentials: "include"
    }).then(r => r.json());

    onSuccess(profile);
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        required
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
      <button type="button" onClick={onSwitch}>Register</button>
    </form>
  );
}
