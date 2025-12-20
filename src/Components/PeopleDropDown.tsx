import React, { useState, useEffect } from "react";
import { getUsers, type User } from "../services/UserService";

interface PeopleDropdownProps {
  onSelect: (user: User) => void;
}

const PeopleDropdown: React.FC<PeopleDropdownProps> = ({ onSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      onSelect(user);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Select a Person</h3>

      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          Error loading users: {error}
        </div>
      )}

      {/* Dropdown */}
      {!loading && !error && (
        <>
          <div className="mb-3">
            <label htmlFor="userSelect" className="form-label">
              Choose a user:
            </label>
            <select
              id="userSelect"
              className="form-select"
              onChange={handleSelectUser}
              defaultValue=""
            >
              <option value="">-- Select a user --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Details Card */}
          {selectedUser && (
            <div className="card mt-3 border-primary">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{selectedUser.name}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedUser.email}`}>
                    {selectedUser.email}
                  </a>
                </p>
                {selectedUser.phone && (
                  <p>
                    <strong>Phone:</strong> {selectedUser.phone}
                  </p>
                )}
                {selectedUser.website && (
                  <p>
                    <strong>Website:</strong>{" "}
                    <a href={`https://${selectedUser.website}`} target="_blank" rel="noreferrer">
                      {selectedUser.website}
                    </a>
                  </p>
                )}
                {selectedUser.address && (
                  <div>
                    <strong>Address:</strong>
                    <p className="ms-3 mb-0">
                      {selectedUser.address.street}, {selectedUser.address.suite}
                      <br />
                      {selectedUser.address.city},{" "}
                      {selectedUser.address.zipcode}
                    </p>
                  </div>
                )}
                {selectedUser.company && (
                  <div>
                    <strong>Company:</strong>
                    <p className="ms-3 mb-0">{selectedUser.company.name}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PeopleDropdown;
