import { writeFileSync } from 'fs';

export const writeFile = (data: string, path: string): boolean => {
  try {
    writeFileSync(path, data);
    return true;
  } catch (err) {
    return false;
  }
};
