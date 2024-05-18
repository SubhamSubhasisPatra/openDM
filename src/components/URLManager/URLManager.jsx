import React from "react";

export default function URLManager() {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Paste your link here..."
        className="form-input px-4 py-2 w-full rounded-md border-2 border-zinc-200 focus:border-blue-500 focus:outline-none"
      />
      <button className="ml-4 bg-blue-500 text-white p-2 rounded-lg">🔄</button>
    </div>
  );
}
