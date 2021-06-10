import React from "react";

const SearchBar: React.FC<{
  searchTerm: any;
  updateSearchTerm: any;
}> = ({ searchTerm, updateSearchTerm }) => {
  return (
    <form action="/" method="get">
      <input
        value={searchTerm}
        onInput={(e) => updateSearchTerm(e.currentTarget.value)}
        type="text"
        id="header-search"
        placeholder="Search posts"
        name="search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
