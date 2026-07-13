import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
const tokenOptions = (expiresIn: string): SignOptions => ({
  expiresIn: expiresIn as SignOptions['expiresIn'],
});
export const createAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, tokenOptions(env.ACCESS_TOKEN_TTL));
export const createRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, tokenOptions(env.REFRESH_TOKEN_TTL));
export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string };
export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
