import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import parseSignUpPayload from '../assets/ParseSignUpPayload'


const uploadImageAndGetUrl = async (e) =>
{
	const image = e.target.files[0];
	if (!image)
		return
	const payload_image = new FormData()
	payload_image.append('file', image)
	payload_image.append('upload_preset', 'gtkm-images')
	try {
		const res = await fetch('https://api.cloudinary.com/v1_1/dzpnrmlnx/image/upload', {
			method: 'POST',
			body:payload_image
		})
		const data = await res.json()
		return (data.secure_url)
	} catch (error) {
		return null
	}
}


const SignupForm = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [profileImg, setProfileImg] = useState('/default-profile-image.jpg');
	const [termChecked, setTermChecked] = useState(false);
	const [invalidForm, setInvalidForm] = useState({display: false, content: ''})
	const [Confpassword, setConfpassword] = useState('')
	const [payload, setPayload] = useState({
		image_url: '/default-profile-image.jpg',
		full_name: '',
		username: '',
		email: '',
		password: '',
		terms: false
	})
	const updateImagePlaceholder = (e) =>
		{
			setProfileImg(URL.createObjectURL(e.target.files[0]));
		}

	const updateFormData = ({name, value}) =>
	{
		setPayload((payload)=>
		({
			...payload,
			[name]: value
		})
	)
	}



	const handleTermCheckbox = (e) =>
	{
		const newTermBool = !termChecked
		setTermChecked(newTermBool)
		updateFormData({name: 'terms', value: newTermBool})
	}
	const uploadAndUpdateImage = async (e) =>
	{
		updateImagePlaceholder(e)
		const url = await uploadImageAndGetUrl(e)
		if (url)
			updateFormData({name: 'image_url', value: url})
		else
		updateFormData({name: 'image_url', value: '/default-profile-image.jpg'})
	}
const handleSubmit = async (e) =>
{
	e.preventDefault()
	const {ok, message} = parseSignUpPayload(payload)
	if (!ok)
	{
		setInvalidForm({display:true, content: message})
		return ;
	}
	if (Confpassword != payload.password)
	{
		setInvalidForm({display:true, content: 'The passwords are not identical!'})
		return ;

	}
	try
	{
		const res = await fetch('http://localhost:3000/api/auth/signup', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(payload)
		})
		const {success, message} = await res.json();
		if (!success)
		{
			setInvalidForm({display: true, content: message});
			return ;
		}
		if (!res.ok)
		{
			setInvalidForm({display: true, content: "semething went wrong"});
		}
		const token = localStorage.getItem('token')
		console.log(token);
		navigate(`/home/profile/${payload.username}`)
	}
	catch (err)
	{
		setInvalidForm({display: true, content: `semething went wrong ${err.message}`})
	}
} 

	return(
		<div className="signup mt-12">
			<div className="label">
				<h4 className="md:text-4xl text-2xl text-center">Sign up</h4>
			</div>
			<div className="login-form w-10/12 mx-auto px-4 py-8 mt-4 bg-gray-900 rounded-lg shadow-sm shadow-gray-700">
			<div className="incorrect-password w-full relative md:w-2/3 mx-auto block"><p className={`text-gray-200  max-sm:text-xs mx-auto text-center py-2 px-4 bg-red-500 rounded ${invalidForm.display ? 'block' : 'hidden'}`} >{invalidForm.content}</p>
				<button
				onClick={()=> setInvalidForm({display: false})}
				className={`top-[1px] right-[1px] absolute text-[8px] bg-black bg-opacity-50 w-4 h-4 rounded-full ${invalidForm.display ? 'block' : 'hidden'}`} ><i class="fa-solid fa-x"></i>
				</button>
				</div>
				<form onSubmit={handleSubmit} action="" method="get" className="flex flex-col gap-6 items-center mt-6">
					<div className=" max-md:w-full w-8/12 flex items-center">
						<label htmlFor="" className="md:text-lg pr-3 text-gray-300 text-left w-1/4">Profile Picture</label>
						<div className="uploader mx-auto relative">
							<img src={`${profileImg}`} className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-full border border-yellow-500 object-cover" alt="" srcset="" />
							<label htmlFor="UploadProfileImg" className="absolute cursor-pointer w-6 h-6 text-center rounded-full bottom-0 right-0 bg-green-400"><i class="fa-solid fa-upload"></i></label>
							<input type="file" accept="image/*" id="UploadProfileImg" className="hidden"
							onChange={
								uploadAndUpdateImage
							}
							/>
							<input type="text" name="image_url" hidden value={payload.image_url ? payload.image_url : '/default-profile-image.jpg'}/>
						</div>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="full_name" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Full Name</label>
						<input type="text" name="full_name" value={payload.full_name} className="bg-gray-700 rounded-sm bg-opacity-30 w-3/4 md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg" onChange={(e) => updateFormData({name: e.target.name, value: e.target.value})}/>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="email" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Email</label>
						<input type="text" value={payload.email} name="email" className="bg-gray-700 rounded-sm bg-opacity-30 w-3/4 md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg"  onChange={(e) => updateFormData({name: e.target.name, value: e.target.value})}/>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="username" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Username</label>
						<input type="text" value={payload.username} name="username" className="bg-gray-700 rounded-sm bg-opacity-30 w-3/4 md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg"  onChange={(e) => updateFormData({name: e.target.name, value: e.target.value})}/>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="password" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Password</label>
						<div className="w-3/4 relative">
							<input  type={showPassword ? 'text' : 'password'} name="password" className="bg-gray-700 rounded-sm bg-opacity-30 w-full md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg" onChange={(e) => updateFormData({name: e.target.name, value: e.target.value})}/>
						</div>
					</div>
					<div className=" max-md:w-full w-8/12 flex justify-center items-center ">
						<label htmlFor="password" className="md:text-lg pr-3 text-gray-300 text-left w-1/4" >Confirm Password</label>
						<div className="w-3/4 relative">
							<input  type={showPassword ? 'text' : 'password'} name="confirm-password" className="bg-gray-700 rounded-sm bg-opacity-30 w-full md:py-2 py-1 px-2 outline-blue-50 outline-1 md:text-lg" 
							onChange={
								(e) => {
									setConfpassword(e.target.value)
								}
							}
							/>
						</div>
					</div>
					<div className="terms text-xs relative">
						<span className={`absolute text-xs font-bold left-[3px] ${termChecked ? 'block' : 'hidden'}`}><i class="fa-solid fa-check"></i></span>
						<input  value={payload.terms} onChange={handleTermCheckbox} type="checkbox" name="terms" id="terms" className="bg-gray-700 mr-1 rounded-sm bg-opacity-30 w-4 h-4 checked:bg-green-500 appearance-none checked:content-['x'] text-white" />
						<label htmlFor="terms" className="text-gray-300 text-sm">I agree to the <span className="text-blue-500">terms and conditions</span></label>
					</div>
					<div className="login-btn">
						<button className="bg-yellow-500 py-1 px-4 rounded shadow transition-all ease-linear
						 text-gray-800 font-semibold md:text-lg hover:bg-opacity-65 mt-2" >Sign Up</button>
					</div>
				</form>
				<p className="text-right text-gray-500 max-md:text-xs mt-2">already have an account?
				<Link to="/login" className="underline text-blue-100"> Login</Link></p>
			</div>
		</div>
	)
}

export default SignupForm;