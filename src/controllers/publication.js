const { auth, publication } = require('../services');

const { requireAuthentication } = auth;
const { createPublication, findPublications } = publication;

function getPublications() {
  return findPublications();
}

function postPublication(user, content) {
  requireAuthentication(user);
  return createPublication(user, content);
}

module.exports = {
  getPublications,
  postPublication,
};
