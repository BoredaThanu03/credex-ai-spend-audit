"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { pricingData } from "../data/pricing";
import { useLocalStorage } from "../hooks/useLocalStorage";

const aiTools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "OpenAI API",
  "Anthropic API",
];

const toolPlans: Record<string, string[]> = {
  ChatGPT: ["Plus", "Team", "Enterprise"],

  Claude: ["Pro", "Team", "Enterprise"],

  Cursor: ["Pro", "Business", "Enterprise"],

  Gemini: ["Pro", "Ultra"],

  "GitHub Copilot": [
    "Individual",
    "Business",
    "Enterprise",
  ],
};

export default function Home() {
  const [tool, setTool] = useLocalStorage(
    "tool",
    ""
  );

  const [plan, setPlan] = useLocalStorage(
    "plan",
    ""
  );

  const [spend, setSpend] =
    useLocalStorage("spend", "");

  const [teamSize, setTeamSize] =
    useLocalStorage("teamSize", "");

  const [useCase, setUseCase] =
    useLocalStorage("useCase", "Coding");

  const [result, setResult] = useState<{
    message: string;
    monthlySavings: number;
    annualSavings: number;
  } | null>(null);

  const [audits, setAudits] = useState<
    {
      tool: string;
      plan: string;
      spend: number;
      savings: number;
    }[]
  >([]);

  const addToolAudit = () => {
    const spendAmount = Number(spend);

    const toolPricing =
      pricingData[
        tool as keyof typeof pricingData
      ];

    const estimatedCost =
      toolPricing?.[
        plan as keyof typeof toolPricing
      ] || 0;

    const expectedSpend =
      estimatedCost * Number(teamSize);

    const savings = Math.max(
      spendAmount - expectedSpend,
      0
    );

    const newAudit = {
      tool,
      plan,
      spend: spendAmount,
      savings,
    };

    setAudits([...audits, newAudit]);
  };

  const generateAudit = async () => {
    const spendAmount = Number(spend);

    const size = Number(teamSize);

    const toolPricing =
      pricingData[
        tool as keyof typeof pricingData
      ];

    const estimatedCost =
      toolPricing?.[
        plan as keyof typeof toolPricing
      ] || 0;

    const expectedSpend =
      estimatedCost * size;

    const monthlySavings = Math.max(
      spendAmount - expectedSpend,
      0
    );

    const annualSavings =
      monthlySavings * 12;

    const { error } = await supabase
      .from("audits")
      .insert([
        {
          tool,
          plan,
          spend: spendAmount,
          team_size: size,
          use_case: useCase,
          monthly_savings:
            monthlySavings,
          annual_savings:
            annualSavings,
        },
      ]);

    console.log(error);

    if (monthlySavings > 0) {
      setResult({
        message:
          "Your team may be overspending on current AI subscriptions. Reviewing usage and plan selection could reduce costs significantly.",
        monthlySavings,
        annualSavings,
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
              onChange={(e) =>
                setTool(e.target.value)
              }
            >
              <option value="">
                Select Tool
              </option>

              {aiTools.map((toolName) => (
                <option key={toolName}>
                  {toolName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Plan
            </label>

            <select
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={plan}
              onChange={(e) =>
                setPlan(e.target.value)
              }
            >
              <option value="">
                Select Plan
              </option>

              {toolPlans[tool]?.map(
                (planName) => (
                  <option key={planName}>
                    {planName}
                  </option>
                )
              )}
            </select>
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
              onChange={(e) =>
                setSpend(e.target.value)
              }
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
              onChange={(e) =>
                setTeamSize(e.target.value)
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Primary Use Case
            </label>

            <select
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              value={useCase}
              onChange={(e) =>
                setUseCase(e.target.value)
              }
            >
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data Analysis</option>
              <option>Mixed</option>
            </select>
          </div>

          <button
            onClick={addToolAudit}
            className="w-full bg-zinc-700 py-3 rounded-lg font-semibold hover:bg-zinc-600"
          >
            Add Tool to Audit
          </button>

          <button
            onClick={generateAudit}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Generate Audit
          </button>

          {audits.length > 0 && (
            <div className="space-y-4">
              {audits.map((audit, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {audit.tool}
                      </h3>

                      <p className="text-gray-400">
                        {audit.plan} Plan
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-400 text-sm">
                        Potential Savings
                      </p>

                      <h3 className="text-2xl font-bold text-green-400">
                        ${audit.savings}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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

              {result.monthlySavings >=
                100 && (
                <div className="bg-blue-900 border border-blue-700 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold mb-2">
                    Save More with Credex
                  </h3>

                  <p className="text-gray-300 mb-3">
                    Your team may qualify
                    for discounted AI
                    infrastructure credits
                    through Credex.
                  </p>

                  <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
                    Book Consultation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}