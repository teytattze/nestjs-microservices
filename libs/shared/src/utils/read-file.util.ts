import { readFileSync } from 'fs';

export const readFile = (path: string): string => {
  try {
    return readFileSync(path, {
      encoding: 'utf-8',
    });
  } catch (err) {
    throw new Error(err);
  }
};
