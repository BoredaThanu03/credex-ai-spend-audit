"use client";

import { useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState<{
  message: string;
  monthlySavings: number;
  annualSavings: number;
} | null>(null);
  const generateAudit = () => {
  const spendAmount = Number(spend);
  const size = Number(teamSize);

  if (tool === "ChatGPT" && size <= 2 && spendAmount > 50) {
    setResult({
      message:
        "Your team may be overspending on ChatGPT Team plans. Smaller teams can often reduce costs using Plus subscriptions.",
      monthlySavings: 120,
      annualSavings: 1440,
    });
  } else if (tool === "Claude" && spendAmount > 100) {
    setResult({
      message:
        "Claude usage appears expensive relative to your team size. Reviewing API usage could reduce costs.",
      monthlySavings: 80,
      annualSavings: 960,
    });
  } else {
    setResult({
      message:
        "Your AI spending appears optimized for your current usage.",
      monthlySavings: 0,
      annualSavings: 0,
    });
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
  <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl mt-6">
    <h2 className="text-2xl font-bold mb-4">
      Audit Results
    </h2>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-black p-4 rounded-lg">
        <p className="text-gray-400 text-sm">
          Monthly Savings
        </p>

        <h3 className="text-3xl font-bold text-green-400">
          ${result.monthlySavings}
        </h3>
      </div>

      <div className="bg-black p-4 rounded-lg">
        <p className="text-gray-400 text-sm">
          Annual Savings
        </p>

        <h3 className="text-3xl font-bold text-green-400">
          ${result.annualSavings}
        </h3>
      </div>
    </div>

    <div className="bg-zinc-900 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">
        Recommendation
      </h3>

      <p className="text-gray-300">
        {result.message}
      </p>
    </div>
  </div>
)}
        </div>
      </div>
    </main>
  );
}