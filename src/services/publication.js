import { ServerError } from '~/helpers/server';
import Publication from '~/models/Publication';

export function findPublications(filter = {}) {
  return Publication.find(filter).exec();
}

export async function createPublication(user, content) {
  const newPublication = new Publication();
  newPublication.user = user;
  newPublication.content = content;

  try {
    await newPublication.validate();
    return newPublication.save();
  } catch (validateError) {
    throw new ServerError(validateError.message, 400);
  }
}
