import React from "react";
import SignupForm from "./SignupForm";
const Signup = () =>
	{
		return(
			<>
			<div className="logo w-full h-60 p-10">
				<img src="/vite.svg" alt="alt" className=" mx-auto md:h-48 h-28 w-auto" />
			</div>
			<div className="label md:mt-10 text-center w-10/12 mx-auto">
				<span className="max-md:text-4xl text-6xl font-semibold" >GTKM</span>
				<p className="text-gray-400 mt-3">
					Get To Know Me, is a platform that allows you to create a profile that can be shared with others,
					so they can get to know you better. Sign up now and start sharing your profile with others.
				</p>
				</div>
				<SignupForm />
			</>
		)
	}
export default Signup;