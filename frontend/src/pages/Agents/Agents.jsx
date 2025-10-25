import React, { useEffect, useState } from "react";
import { createAgent, getAgents } from "../../services/api";

export default function Agents() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: ""});
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await getAgents();
      setAgents(res.data.agents || []);
    } catch (err) { console.error(err); }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createAgent(form);
      setForm({ name: "", email: "", mobile: "", password: ""});
      fetchAgents();
      alert("Agent created");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h2>Agents</h2>
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" required/>
        <input name="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" required/>
        <input name="mobile" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} placeholder="+91xxxxxxxxxx" required/>
        <input name="password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" required/>
        <button type="submit">Create Agent</button>
      </form>

      <h3>Existing agents</h3>
      <ul>
        {agents.map(a => (<li key={a._id}>{a.name} — {a.email} — {a.mobile}</li>))}
      </ul>
    </div>
  );
}
