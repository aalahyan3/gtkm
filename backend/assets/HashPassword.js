import bcrypt from 'bcryptjs';

const HashPassword = async (password) => {
	const SALT = await bcrypt.genSalt(10);
	const HashPassword = await bcrypt.hash(password, SALT);
	return HashPassword;
}

const VerifyPassword = async (password, hashedPass) =>
{
	const bool = await bcrypt.compare(password, hashedPass)
	return bool;
}

export {HashPassword, VerifyPassword };