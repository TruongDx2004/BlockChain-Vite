import { useState, useEffect } from 'react';
import { GroupCard } from './GroupCard';
import { PlusSquare } from 'react-feather'; // Import biểu tượng + (cần cài thư viện react-feather)
import '../styles/GroupList.css';

export function GroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group-list-container">
      <h2 className="page-title">My Groups</h2>

      {/* Button to create a group */}
      <button className="create-group-btn" onClick={handleOpenModal}>
        <PlusSquare className="create-group-icon" /> Create Group
      </button>

      {/* Modal for creating a new group */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Create New Group</h3>
            <input
              type="text"
              className="input-field"
              placeholder="Group Name"
            />
            <textarea
              className="input-field"
              placeholder="Group Description"
            />
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button className="create-btn">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="loading-text">Loading groups...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : groups.length === 0 ? (
        <p className="empty-text">No groups available.</p>
      ) : (
        <div className="group-cards-container">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupList;
