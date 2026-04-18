import { useState } from "react";
import axios from "axios";
import TranscriptInput from "./components/TranscriptInput";
import Results from "./components/Results";
import LoadingState from "./components/LoadingState";

function App() {
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeTranscript = async () => {
    if (!transcript.trim()) {
      setError("Please paste a transcript first!");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        transcript: transcript,
      });
      setResults(response.data);
    } catch (err) {
      setError("Something went wrong. Make sure your backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          AfterMeet <span className="text-blue-400">AI</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Paste your meeting transcript and let AI do the rest
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - input */}
          <div>
            <TranscriptInput
              transcript={transcript}
              setTranscript={setTranscript}
              onAnalyze={analyzeTranscript}
              loading={loading}
            />
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </div>

          {/* Right side - results */}
          <div>
            {loading && <LoadingState />}
            {results && !loading && <Results results={results} />}
            {!results && !loading && (
              <div className="h-full flex items-center justify-center border border-dashed border-gray-700 rounded-xl p-12 text-center">
                <div>
                  <p className="text-gray-500 text-lg">
                    Results will appear here
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Paste a transcript and click Analyze
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
