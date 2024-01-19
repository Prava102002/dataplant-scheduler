// Search.tsx
import React from "react";

interface SearchProps {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      className="search-input border rounded p-2"
    />
  );
};

export default Search;
