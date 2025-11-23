"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">Зареждане...</p>
      </div>
    </div>
  );
}
