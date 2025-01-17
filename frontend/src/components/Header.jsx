import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
export default function Header() {
  return (
	<header className='flex justify-between items-center w-full p-4 h-22'>
	  <Logo/>
	  <Nav/>
	</header>
  )
}
