import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export const createRandomBytes = (bytes: number) => {
  return randomBytes(bytes).toString('hex');
};

export const compareHashedString = async (
  value: string,
  hashedString: string,
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedString);
};
