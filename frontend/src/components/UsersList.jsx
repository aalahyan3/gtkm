import React, { useState, useRef, useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
// import Users from "../assets/users";

const UsersList = () => {
  const [allUsersList, setAllUsersList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [search, setSearch] = useState("");
  const [hilightSearchButton, setHilightSearchButton] = useState(false);
	const navigate = useNavigate()

useEffect(()=>
{
	const fetchUsers = async () =>
	{
		try{
			const res = await fetch('http://localhost:3000/api/users',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
				credentials: 'include'
			}
			)

			const data = await res.json()
			console.log(data);
			if (data.auth === false)
			{
				navigate('/');
				return ;
			}
			if (!res.ok)
				throw new error(data.message);
			setAllUsersList(data.usersList)
			setUsersList(data.usersList)
		}
		catch (err){
			console.log(err.message);
		}
	}
	fetchUsers();
}, [])


  const updateUsersList = (search) => {
    const filteredUsers = allUsersList.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setUsersList(filteredUsers);
  };

  useEffect(() => {
    setHilightSearchButton(usersList.length === 0);
  }, [usersList]);

  const SearchBox = ({ highlight, search, onSearchChange }) => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
      <form
        className="box md:w-1/2 w-10/12 mx-auto mt-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for user"
          className="w-10/12 bg-transparent border rounded-tl-md 
		  rounded-bl-md md:px-3 px-1 md:py-2 py-1 inline-block border-gray-600 
		  focus:outline-none focus:border-yellow-500 md:text-xl text-lg"
        />
        <button
          type="submit"
          className={`bg-gray-600 w-2/12 border border-gray-500 md:px-3 md:py-2 px-1 py-1 md:text-xl  text-lg rounded-tr-md rounded-br-md`}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    );
  };

const NoUserFound = () => {
	return (
		<div className="no_usrs_found h-full w-full text-center flex flex-col items-center justify-center">
			<i class="fa-solid fa-exclamation text-7xl bg-yellow-500 rounded-full h-20 w-20"></i>
			<span className="text-gray-500">No User Was Found</span></div>
	);
};

  return (
    <>
      <SearchBox
        highlight={hilightSearchButton}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          updateUsersList(value);
        }}
      />
      <div className="w-11/12 mx-auto mt-10">
        <div className="title_users_list text-4xl text-center">
          <h3>Users List</h3>
        </div>
        <div className="users-list border border-gray-700 bg-opacity-10 bg-gray-700 shadow-sm p-2 mt-8 overflow-y-scroll">
          {usersList.length > 0
            ? usersList.map((user) => (
                <UserCard
                  key={user.id}
                  username={user.username}
                  pic_profile={user.image_url}
                />
              ))
            : <NoUserFound />}
        </div>
      </div>
    </>
  );
};

export default UsersList;
