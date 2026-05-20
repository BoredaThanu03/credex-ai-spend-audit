"use client";

import { useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState("");
  const generateAudit = () => {
  const spendAmount = Number(spend);
  const size = Number(teamSize);

  if (tool === "ChatGPT" && size <= 2 && spendAmount > 50) {
    setResult(
      "You may be overspending on ChatGPT. Smaller teams often save by switching from Team plans to Plus plans."
    );
  } else if (tool === "Claude" && spendAmount > 100) {
    setResult(
      "Claude usage appears high. Consider optimizing API usage or reviewing plan requirements."
    );
  } else {
    setResult(
      "Your current AI spending appears reasonable based on the provided inputs."
    );
  }
};

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Discover how much your startup is overspending on AI tools.
        </p>

        <div className="bg-zinc-900 p-8 rounded-2xl space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              AI Tool
            </label>

            <select
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              <option value="">Select Tool</option>
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>GitHub Copilot</option>
              <option>Gemini</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Plan
            </label>

            <input
              type="text"
              placeholder="Pro / Team / Enterprise"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              placeholder="200"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Team Size
            </label>

            <input
              type="number"
              placeholder="5"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </div>

          <button
  onClick={generateAudit}
  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200"
>
  Generate Audit
</button>
{result && (
  <div className="bg-green-900 border border-green-700 p-4 rounded-lg mt-6">
    <h2 className="text-xl font-semibold mb-2">
      Audit Result
    </h2>

    <p>{result}</p>
  </div>
)}
        </div>
      </div>
    </main>
  );
}