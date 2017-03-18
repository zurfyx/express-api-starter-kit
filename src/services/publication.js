const { ServerError } = require('../helpers/server');
const Publication = require('../models/Publication');

function findPublications(filter = {}) {
  return Publication.find(filter).exec();
}

async function createPublication(user, content) {
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

module.exports = {
  findPublications,
  createPublication,
};
