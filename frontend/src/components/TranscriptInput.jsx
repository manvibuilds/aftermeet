function TranscriptInput({ transcript, setTranscript, onAnalyze, loading }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Meeting Transcript
        </label>
        <textarea
          className="w-full h-80 bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-100 text-sm resize-none focus:outline-none focus:border-blue-500 placeholder-gray-600"
          placeholder="Paste your meeting transcript here...

Example:
John: Let's finalize the launch date.
Sarah: I suggest Friday works best.
John: Agreed, Friday it is..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
      >
        {loading ? "Analyzing..." : "Analyze Meeting"}
      </button>
    </div>
  );
}

export default TranscriptInput;
