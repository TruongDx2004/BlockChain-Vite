import { useState } from "react";
import "../../assets/css/tailwind.css";

const data = {
  created: [
    { id: "0x70C2...bF58c", value: 1314 },
    { id: "0xF10F...7b0ac", value: 447 },
    { id: "0x4094...11c8", value: 268 },
  ],
  participated: [
    { id: "0x70C2...bF58c", value: 1316 },
    { id: "0xe25A...fC59E", value: 1134 },
  ],
  analyst: [
    { id: "0x7eeE...D48cF", value: 1302 },
    { id: "0xe25A...fC59E", value: 482 },
  ],
};

export default function Leaderboard() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-600 rounded-full mb-4"></div>
        <p className="text-lg font-semibold">undef...fined</p>
        <p className="text-sm text-gray-400">Ranking #0</p>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Leaderboards</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("created")}
              className="border border-gray-500 text-gray-200 px-4 py-2 rounded hover:bg-gray-700"
            >
              Created
            </button>
            <button
              onClick={() => setFilter("participated")}
              className="border border-gray-500 text-gray-200 px-4 py-2 rounded hover:bg-gray-700"
            >
              Participated
            </button>
            <button
              onClick={() => setFilter("analyst")}
              className="border border-gray-500 text-gray-200 px-4 py-2 rounded hover:bg-gray-700"
            >
              Analyst
            </button>
            <button
              onClick={() => setFilter("all")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {Object.keys(data).map((key) =>
            filter === "all" || filter === key ? (
              <div key={key} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold capitalize">{key}</h3>
                <ul className="mt-2 space-y-2">
                  {data[key].map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between text-gray-300"
                    >
                      <span>{item.id}</span>
                      <span className="font-bold text-white">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
