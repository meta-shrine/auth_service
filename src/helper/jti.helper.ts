import { randomUUID } from 'crypto';

export const generateJti = () => {
  return randomUUID();
};
