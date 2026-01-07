import React, { useState } from "react";

export default function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    role: "student",
    fname: "",
    lname: "",
    username: "",
    class: "",
    password: ""
  });

  const submit = async e => {
    e.preventDefault();

    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });

    onSwitch();
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>

      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <input placeholder="First Name" required onChange={e => setForm({ ...form, fname: e.target.value })} />
      <input placeholder="Last Name" required onChange={e => setForm({ ...form, lname: e.target.value })} />
      <input placeholder="Username" required onChange={e => setForm({ ...form, username: e.target.value })} />

      {form.role === "student" && (
        <input placeholder="Class" required onChange={e => setForm({ ...form, class: e.target.value })} />
      )}

      <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />

      <button type="submit">Create Account</button>
    </form>
  );
}
