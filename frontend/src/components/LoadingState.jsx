function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm">
        AI is analyzing your transcript...
      </p>
      <p className="text-gray-600 text-xs">Running 4 agent nodes in sequence</p>
    </div>
  );
}

export default LoadingState;
