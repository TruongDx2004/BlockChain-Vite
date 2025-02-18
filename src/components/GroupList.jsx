import { useState, useEffect } from 'react';
import { GroupCard } from './GroupCard';

export function GroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Giả lập tải dữ liệu từ API
    const fetchGroups = async () => {
      try {
        // Gọi API thực tế nếu cần
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  id: 1,
                  name: 'Crypto Traders',
                  description: 'Group for crypto trading predictions',
                  isPrivate: false,
                  members: ['0x123', '0x456', '0x789'],
                },
                {
                  id: 2,
                  name: 'NFT Collectors',
                  description: 'Predicting NFT floor prices',
                  isPrivate: true,
                  members: ['0x123', '0x456'],
                },
              ]),
            1000
          )
        );
        setGroups(response);
      } catch (err) {
        setError('Failed to load groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Groups</h2>
      {loading ? (
        <p className="text-gray-600">Loading groups...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : groups.length === 0 ? (
        <p className="text-gray-600">No groups available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
