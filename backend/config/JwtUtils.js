
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const generateToken = (username) =>
{
	return jwt.sign({ username }, process.env.SECRET_KEY)
}


export { generateToken }