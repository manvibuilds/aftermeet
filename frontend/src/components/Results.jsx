import { useState } from "react";

function Results({ results }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(results.email_draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
          Summary
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          {results.summary}
        </p>
      </div>

      {/* Action Items */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">
          Action Items
        </h2>
        <div className="flex flex-col gap-3">
          {results.action_items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-800 rounded-lg p-3"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-gray-200 text-sm font-medium">{item.task}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Owner: <span className="text-gray-400">{item.owner}</span>
                  {" · "}
                  Deadline:{" "}
                  <span className="text-gray-400">{item.deadline}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decisions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
          Decisions Made
        </h2>
        <div className="flex flex-col gap-3">
          {results.decisions.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-gray-200 text-sm">{item.decision}</p>
                {item.context && (
                  <p className="text-gray-500 text-xs mt-0.5">{item.context}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Draft */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
            Email Draft
          </h2>
          <button
            onClick={copyEmail}
            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy Email"}
          </button>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {results.email_draft}
        </p>
      </div>
    </div>
  );
}

export default Results;
