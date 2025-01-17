import express from 'express';
import { client } from '../config/ConnectDb.js';
import { HashPassword, VerifyPassword } from '../assets/HashPassword.js';
import { generateToken } from '../config/JwtUtils.js';


const signIn = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
	{
		return res.status(400).json({
			success : false,
			message: "All fields are required"
		})
	}
	const db = client.db('gtkm')
	const collection = db.collection('users')
	const currentUser = await collection.findOne({username: username})
	if (!currentUser)
		return res.status(401).json({success: false, message: "No user was found!"});
	const correctPasword = await VerifyPassword(password, currentUser.password);
	if (!correctPasword)
	{
		return res.status(400).json({
			success : false,
			message: "Invalid username or password"
		})
	}
	const token = generateToken(username);
	res.cookie('whoami', token, {
		httpOnly: true,
		secure : false,
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000
	})
	return res.status(200).json({
		success : true,
		message: "user logged sucessfully",
		user: currentUser
	})
}

const signUp = async (req, res) => {
	const {
		full_name,
		email,
		username,
		image_url,
		password
	} = req.body;
	if (!full_name || !email || !username || !password || !image_url)
	{
		return res.status(400).json({
			success : false,
			message: "All fields are required"
		})
	}
	const hashedPassword = await HashPassword(password);
	const db = client.db('gtkm');
	const collection = db.collection('users');
	const to_insert = {
		full_name,
		email,
		username,
		image_url,
		password: hashedPassword
	};
	const existingUser = await collection.findOne({username: username});
	if (existingUser)
	{
		return res.status(400).json({
			success : false,
			message: "Username already exist"
		})
	}
	const newUser = await collection.insertOne(to_insert);
	const token = generateToken(username)

	res.setHeader('Authorization', `Bearer ${token}`)

	return res.status(200).json({
		success : true,
		message: "User signed up successfully",
		user: newUser
	})
}

export { signIn, signUp}
