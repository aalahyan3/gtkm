import React, { useState } from 'react';
import Users from "../assets/users";

const [usersList, setUsersList] = useState(Users);

const Box =() => {
  return (
	<div className="box lg:w-1/2 mx-auto mt-24 p-12">
		<form action="" method="get">
			<input placeholder="Search for user" type="text" className="w-10/12 bg-transparent border rounded-tl-md rounded-bl-md
			px-3 py-2 inline-block border-gray-600 focus:outline-none focus:border-yellow-500 text-2xl"/>
			<button type="submit" className="bg-gray-600 w-2/12 border border-gray-600 inline-block px-3 py-2 text-2xl
			rounded-tr-md rounded-br-md"><i class="fa-solid fa-magnifying-glass"></i></button>
		</form>
		
	</div>
  );
}

export default Box;