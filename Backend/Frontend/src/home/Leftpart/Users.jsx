import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

const Users = () => {
  const [data, loading] = useGetAllUsers();
  const allUsers = data?.allUsers || [];

  console.log("allUsers in render:", allUsers);

  if (loading) return <div>Loading users...</div>;

  if (!allUsers.length) {
    return <div>No users found</div>;
  }

  return (
    <div className="mt-2">
      <h1 className="px-2 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{
          maxHeight: "calc(84vh - 10vh)",
          scrollbarWidth: "none",
        }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
