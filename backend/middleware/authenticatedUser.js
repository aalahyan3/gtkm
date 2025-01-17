import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const Authentification = (req, res, next) => {
	const token = req.cookies.whoami;
  
	if (!token) {
	  return res.status(401).json({
		auth: false,
		message: 'Token is required',
	  });
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
	  if (err) {
		return res.status(403).json({
		  auth: false,
		  message: 'Invalid or expired token',
		});
	  }
	req.user = decode;
	next();
	});
  };

export default Authentification;