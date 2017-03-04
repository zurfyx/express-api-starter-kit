import { requireAuthentication } from '~/services/auth';
import { findPublications, createPublication } from '~/services/publication';

export function getPublications() {
  return findPublications();
}

export function postPublication(user, content) {
  requireAuthentication(user);
  return createPublication(user, content);
}
