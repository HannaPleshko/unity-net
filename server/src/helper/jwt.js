import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createToken = (user) => {
  const { _id } = user;
  const jwtSecret = crypto.randomBytes(32).toString('hex');

  const token = jwt.sign({ _id }, jwtSecret);
  return { token };
};

export { createToken };