import { regionRelative } from "@cloudinary/url-gen/qualifiers/flag";






const check_full_name = (full_name) => {
	if (!full_name) return false;
	
	const words = full_name.trim().split(' ');
	
	return words.length >= 2 && /^[a-zA-Z\s]+$/.test(full_name);
  };
  

const validEmail = (email) =>
{
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return (emailRegex.test(email))
}

const parseSignUpPayload  = ({full_name, username, password, email, terms}) =>
{
	if (!check_full_name(full_name))
		return ({ok:false, message:'full name must contains at least first and last name!'})
	if (!validEmail(email))
		return ({ok:false, message:'Please enter a valid email!'})
	if (!username)
		return ({ok:false, message:'Username is required'})
	if (username.length < 8 || !/^[a-z0-9_.]+$/.test(username))
		return ({ok:false, message:'the username must be containing only lowercases, numbers, 8 characters minimum or \' _ \' and \' . \''})
	if (!password)
		return ({ok:false, message:'Password is Required!'})
	if (!/^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/.test(password))
		return ({ok:false, message:
	'Password must contain at least one digit, one alphabetical and 10 characters minimum!'})
	if (!terms)
		return ({ok:false, message:'please approve the terms!'})
	return ({ok:true, message:'All good'})
}

export default parseSignUpPayload