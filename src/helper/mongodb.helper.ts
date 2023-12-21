import mongoose from 'mongoose';

export const toMongoId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};
