import React from "react";
import { SortOptions } from "./Posts";
import { toTitleCase } from "../helpers";

const PostsSort: React.FC<{
  changeSort: any;
  sortOption: any;
}> = ({ changeSort, sortOption }) => {
  return (
    <>
      <select
        className="ui dropdown"
        onChange={(e) => changeSort(e.target.value)}
      >
        {Object.keys(SortOptions).map((option: any) => (
          <option selected={sortOption === option} value={option}>
            {toTitleCase(option)}
          </option>
        ))}
      </select>
    </>
  );
};

export default PostsSort;
