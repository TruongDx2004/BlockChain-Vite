import React from "react";
import { Lock, Globe } from "lucide-react"; // Import icon

export function GroupCard({ group }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between transition hover:shadow-lg transform hover:-translate-y-1 duration-300">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{group.name}</h3>
          <span className="text-sm text-gray-500">{group.members.length} members</span>
        </div>
        <p className="text-gray-600 mt-2">{group.description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span
          className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded ${
            group.isPrivate ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
          }`}
        >
          {group.isPrivate ? <Lock size={14} /> : <Globe size={14} />}
          {group.isPrivate ? "Private" : "Public"}
        </span>
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 active:scale-95 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
