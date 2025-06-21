import jwt from 'jsonwebtoken';

const generateToken = (id,email,name) => {
  const payload = {
    id,email,name
  };

  const secret = process.env.JWT_SECRET; 
  const options = { expiresIn: process.env.EXPIRE_IN };

  const token = jwt.sign(payload, secret, options);
  return token;
};

export default generateToken;