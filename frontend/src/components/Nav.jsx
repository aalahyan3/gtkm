import React from 'react'
import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
		<nav className=''>
			<ul className='flex text-center md:text-lg'>
				<li className=' border w-20 text-center 
				 border-gray-500 rounded-tl rounded-bl hover:bg-yellow-500 transition-all ease-linear hover:text-gray-800'>
					<NavLink to="/home/users" className={({isActive}) => isActive ? 'block md:py-1 border-b border-yellow-500': 'block md:py-1'}>
						<i class="fa-solid fa-users"></i> Users</NavLink>
				</li>
				<li className=' border w-20 text-center 
				 border-gray-500 rounded-tr rounded-br hover:bg-yellow-500 transition-all ease-linear hover:text-gray-800'>
					<NavLink to="/home/profile" className={({isActive}) => isActive ? 'block md:py-1 border-b border-yellow-500': 'block md:py-1'}>
						<i class="fa-solid fa-user"></i> Profile</NavLink>
				</li>
			</ul>
		</nav>
  )
}

export default Nav