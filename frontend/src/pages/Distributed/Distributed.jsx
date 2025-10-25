import React, { useEffect, useState } from "react";
import { getDistributed } from "../../services/api";

export default function Distributed() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch(); }, []);
  const fetch = async () => {
    try {
      const res = await getDistributed();
      setData(res.data.result || []);
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Distributed Lists</h2>
      {data.map(chunk => (
        <div key={chunk.agent._id} style={{ border: "1px solid #ddd", padding: 10, margin: 10 }}>
          <h3>{chunk.agent.name} ({chunk.agent.email})</h3>
          <ul>
            {chunk.items.map(it => (
              <li key={it._id}>{it.firstName} — {it.phone} — {it.notes}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
