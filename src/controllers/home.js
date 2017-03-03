import { processGreeting } from '~/services/home';

export function hello() {
  return { msg: 'Hi!' };
}

export function getGreeting(name) {
  const greeting = processGreeting(name);
  return { msg: greeting };
}

export function postGreeting(name) {
  const greeting = processGreeting(name);
  return { msg: greeting };
}
