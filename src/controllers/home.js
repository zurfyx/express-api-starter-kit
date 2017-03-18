const { processGreeting } = require('../services').home;

function hello() {
  return { msg: 'Hi!' };
}

function getGreeting(name) {
  const greeting = processGreeting(name);
  return { msg: greeting };
}

function postGreeting(name) {
  const greeting = processGreeting(name);
  return { msg: greeting };
}

module.exports = {
  hello,
  getGreeting,
  postGreeting,
};
