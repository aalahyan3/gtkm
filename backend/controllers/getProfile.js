import { client } from "../config/ConnectDb.js";

const getProfile = async (req, res) =>
{
	try
	{
		const user = req.params.username;
		const db = client.db('gtkm')
		const collection = db.collection('users')
		const userData = await collection.findOne({username: user})
		if (!userData)
		{
			return res.status(404).json({
				auth: true,
				success: false,
				message: `${user} does not exist`
			})
		}
		const {full_name, username, email, image_url} = userData;
		return res.status(200).json({
			auth: true,
			success: true,
			message: 'success',
			full_name,
			username,
			email,
			image_url
		})
	}catch (err){
		res.status(400).json({
			success: false,
			message: err.message
		})
	}
}

export default getProfile