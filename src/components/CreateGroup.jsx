import { useState, useCallback } from "react";

export function CreateGroup({ onSubmit }) {
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setGroupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!groupData.name.trim()) {
        throw new Error("⚠️ Group name is required!");
      }

      await onSubmit(groupData);

      setGroupData({
        name: "",
        description: "",
        isPrivate: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-group">
      <h2>Create New Group</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={groupData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isPrivate"
              checked={groupData.isPrivate}
              onChange={handleChange}
            />
            Private Group
          </label>
        </div>

        <button type="submit" disabled={loading || !groupData.name.trim()}>
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
}
