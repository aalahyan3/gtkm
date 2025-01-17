import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({
	full_name: undefined,
	username: undefined,
	email: undefined,
	image_url: undefined
  });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${username}`,
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
				credentials: 'include'
			}
		)
        const data = await response.json();
		setUser({
			username: data.username,
			full_name: data.full_name,
			email: data.email,
			image_url: data.image_url 
		})
        if (!data.auth)
		{
			navigate('/');
		}
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [username]);

  if (!user.username) {
    return <div>Loading...</div>;
  }

  return (
	<div className="profile max-md:w-[95%]  rounded-lg 
	mx-auto   flex items-center flex-col p-4">
		<div className="image">
			<img src={user.image_url} alt="alt" className='object-cover
			 h-40 w-40 rounded-full border-2 border-gray-400 shadow-sm shadow-gray-400' />
		</div>
		<div className="username text-2xl md:text-3xl mt-2 font-semibold">
			<span>{user.username}</span>
		</div>
		<div className="full_name flex justify-start md:pl-48 w-full mt-10 bg-gray-900 rounded-sm shadow py-2 items-center max-md:p-1">
			<span className='text-gray-400 w-1/3'><i className="fa-regular fa-user"></i> Full name :</span>
			<span className='md:text-2xl w-2/3 text-lg  text-gray-200' >{user.full_name}</span>
		</div>
		<div className="full_name flex justify-start  md:pl-48 w-full mt-10 bg-gray-700 rounded-sm shadow py-2 items-center max-md:p-1">
			<span className='text-gray-400 w-1/3'> <i class="fa-solid fa-envelope"></i> Email :</span>
			<span className='md:text-2xl w-2/3 text-lg text-gray-200' >{user.email}</span>
		</div>
	</div>
  );
};

export default Profile;
