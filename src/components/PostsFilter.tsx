import React from "react";

const PostsFilter: React.FC<{
  changeFilter: any;
  userIds: number[];
  selectedUserId?: number;
}> = ({ changeFilter, userIds, selectedUserId }) => {
  return (
    <>
      <select onChange={(e) => changeFilter(+e.target.value)}>
        {userIds.map((userId: number) => (
          <option selected={selectedUserId === userId} value={userId}>
            {userId}
          </option>
        ))}
      </select>
    </>
  );
};

export default PostsFilter;
