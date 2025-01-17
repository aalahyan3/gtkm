import e from "cors";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [incorrectPassword, setIncorrectPassword] = useState(false);
	const [payload, setPayload] = useState({username: '', password: ''})
	const navigate = useNavigate()

	const togglePassword = () => {
		setShowPassword(!showPassword);
	}
	const toggleIncorrectPassword = () => {
		setIncorrectPassword(!incorrectPassword);
	}


const	handleFormSubmit = async (e) =>
{
	e.preventDefault();
	try{
		const res = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(payload),
			credentials: 'include'
		})
		const {success, message} = await res.json();
		if (!success)
		{
			setIncorrectPassword(true);
			setPayload({username:'', password:''});
		}
		else
		{
			navigate(`/home/profile/${payload.username}`)
		}
	}
	catch (err){
		console.log('Error!');
	}
}

	return(
		<div className="login mt-12">
			<div className="label">
				<h4 className="md:text-4xl text-2xl text-center">Login</h4>
			</div>
			<div className="login-form w-10/12 mx-auto px-4 py-8 mt-4 bg-gray-900 rounded-lg shadow-sm shadow-gray-700">
				<div className={`${incorrectPassword ? 'incorrect-password w-full relative md:w-2/3 mx-auto block' : 'incorrect-password w-full relative md:w-2/3 mx-auto hidden'}`}><p className=" text-gray-200  max-sm:text-xs mx-auto text-center py-2 px-4 bg-red-500 rounded " >username or password is incorrect !</p>
				<button onClick={toggleIncorrectPassword}
				className="top-[1px] right-[1px] absolute text-[8px] bg-black bg-opacity-50 w-4 h-4 rounded-full" ><i class="fa-solid fa-x"></i></button>
				</div>
				<form action="" method="get" className="flex flex-col gap-6 items-center mt-6" onSubmit={(e)=> handleFormSubmit(e)}>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="username" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >username</label>
						<input type="text" name="username" className="bg-gray-700 rounded-sm bg-opacity-30 w-3/4 md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg" 
							 value={payload.username}
							 onChange={(e) =>
								{
									setPayload((payload)=>({...payload, [e.target.name]: e.target.value}))
								}}						/>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="password" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Password</label>
						<div className="w-3/4 relative">
							<input type={showPassword ? 'text' : 'password'} name="password" className={`${incorrectPassword ? 'bg-gray-700 rounded-sm bg-opacity-30 w-full md:py-2 py-1 px-2 outline-red-500 outline outline-1 md:text-lg' :
							 'bg-gray-700 rounded-sm bg-opacity-30 w-full md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg'}`} 
							value={payload.password}
							 onChange={(e) =>
								{
									setPayload((payload)=>({...payload, [e.target.name]: e.target.value}))
								}
							 }
							 />
							<button type="button" className="absolute md:right-1 md:top-[10px] top-1 right-1 text-xs bg-gray-300 p-1 w-6 h-6 rounded-full bg-opacity-50 "
							onClick={togglePassword}
							><i class={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
						</div>
					</div>
					<div className="login-btn">
						<button className="bg-yellow-500 py-1 px-4 rounded shadow transition-all ease-linear
						 text-gray-800 font-semibold md:text-lg hover:bg-opacity-65 mt-2">Login</button>
					</div>
				</form>
				<p className="text-right text-gray-500 max-md:text-xs mt-2">dont't have an account?
				<Link to="/signup" className="underline text-blue-100"> sign up</Link></p>
			</div>
		</div>
	)
}

export default LoginForm;