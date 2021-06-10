import React from "react";
import { SortOptions } from "./Posts";

const PostsSort: React.FC<{
  changeSort: any;
  sortOption: any;
}> = ({ changeSort, sortOption }) => {
  return (
    <>
      <select onChange={(e) => changeSort(e.target.value)}>
        {Object.values(SortOptions).map((option: any) => (
          <option selected={sortOption === option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default PostsSort;
