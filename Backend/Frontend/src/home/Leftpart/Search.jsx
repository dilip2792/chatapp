import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const Search = () => {
    const [search, setSearch] = useState("");
    const [allUsers, loading] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;

        if (!Array.isArray(allUsers) || allUsers.length === 0) {
            alert("Users are not loaded yet.");
            return;
        }

        const conversation = allUsers.find((user) =>
            user.fullname.toLowerCase().includes(search.toLowerCase())
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    };

    if (loading) {
        return <div>Loading users...</div>; // Show a loading indicator while fetching users
    }

    return (
        <div className="h-[10vh]">
            <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-3">
                        <label className="border-[1px] rounded-lg p-3 border-gray-700 bg-slate-900 flex items-center gap-2 w-[80%]">
                            <input
                                type="text"
                                className="outline-none bg-transparent text-white"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button>
                            <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-200" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Search;
