import React from "react";
import { Link} from "react-router-dom"



const UserCard = ({username, pic_profile}) => {
	  return (
	<div className="user-card w-full flex justify-between px-3 py-1 items-center bg-gray-900 rounded-2xl mb-2 shadow">
		<div className="max-w-[25%] profile-pic overflow-hidden max-md:h-20 max-md:w-20 w-28 h-28 rounded-full border border-yellow-500">
			<img className="object-cover w-full h-full" src={pic_profile} alt="img" />
		</div>
		<div className="username max-w-[50%] text-2xl max-md:text-lg break-all">
			<span>{username}</span>
		</div>
		<div className="action-botton max-w-[25%] text-xl max-md:text-lg bg-yellow-500 text-gray-800 px-2 py-1 
		rounded-sm hover:bg-yellow-600 shadow  shadow-slate-600 transition-all ease-linear">
		<Link to={`../profile/${username}`}> <i className="fa-regular fa-eye"></i> View</Link>
		</div>
	</div>
	  );
}

export default UserCard;