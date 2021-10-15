import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export const createRandomBytes = (bytes: number) => {
  return randomBytes(bytes).toString('hex');
};

export const createHashString = async (value: string, saltRounds: number) => {
  const hashedValue = await bcrypt.hash(value, saltRounds);
  return hashedValue;
};

export const compareHashedString = async (
  value: string,
  hashedString: string,
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedString);
};
