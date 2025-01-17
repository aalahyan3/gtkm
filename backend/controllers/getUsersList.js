import {client} from '../config/ConnectDb.js'

const getUsersList = async  (req, res) =>
{
	try{
		const db = client.db('gtkm');
		const collection = db.collection('users')
		const usersList = await collection.find({}, { projection: { password: 0, _id: 0 } }).toArray()
		if (!usersList)
		{
			throw new Error('Error fetching users!');
		}
		else
		{
			return res.status(200).json({
				success: true,
				message: 'users fetched successfully',
				usersList
			})
		}
	}
	catch (err)
	{
		return res.status(400).json({
			success: false,
			message: err.message
		})
	}
}

export default getUsersList