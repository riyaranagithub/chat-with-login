import React, { useState } from 'react';

const UserSearch = ({ onSearch, users, onSelectUser, selectedUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleUserSelect = (username) => {
    onSelectUser(username); // Pass the selected user to the parent
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Show input only if no user is selected */}
      {!selectedUser && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {/* If a user is selected, show only the selected user */}
        {selectedUser ? (
          <li
            key={selectedUser}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            {selectedUser}
          </li>
        ) : (
          users.map((user) => (
            <li
              key={user._id}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleUserSelect(user.username)}
            >
              {user.username}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
