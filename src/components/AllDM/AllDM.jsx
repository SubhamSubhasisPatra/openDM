import React from "react";

const AllDM = () => {
  return (
    <div
      className="flex justify-between items-center mb-4 text-zinc-700"
      style={{ fontWeight: "bold", fontSize: "110%" }}
    >
      <div>
        <button className="text-successGreenLight px-4 py-2 mr-2">
          Start all
        </button>
        <button className="text-inCompleteYellow px-4 py-2">Pause all</button>
      </div>
      <button className="text-failedRedDeep px-4 py-2">Clear Completed</button>
    </div>
  );
};

export default AllDM;
