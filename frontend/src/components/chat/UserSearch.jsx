import React, { useState } from 'react';

const UserSearch = ({ onSearch, users }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
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
      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
            onClick={() => handleUserSelect(user.username)} // Add this line to select user
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );

  function handleUserSelect(username) {
    setRecipient(username); // Set recipient in parent component
  }
};

export default UserSearch; // Ensure default export is present
