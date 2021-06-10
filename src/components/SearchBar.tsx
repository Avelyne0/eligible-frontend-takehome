import React from "react";

const SearchBar: React.FC<{
  searchTerm: any;
  updateSearchTerm: any;
}> = ({ searchTerm, updateSearchTerm }) => {
  return (
    <div className="ui input focus">
      <input
        value={searchTerm}
        onInput={(e) => updateSearchTerm(e.currentTarget.value)}
        type="text"
        id="header-search"
        placeholder="Search posts"
        name="search"
      />
    </div>
  );
};

export default SearchBar;
