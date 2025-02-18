export function GroupCard({ group }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.name}</h3>
      <p className="text-gray-600 mb-4">{group.description}</p>
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            group.isPrivate ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {group.isPrivate ? 'Private' : 'Public'}
        </span>
        <span className="text-gray-500 text-sm">
          {group.members.length} Members
        </span>
      </div>
    </div>
  );
}
