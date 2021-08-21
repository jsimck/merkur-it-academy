const sha3 = require('crypto-js/sha3');

const AUTH_COOKIE = 'merkur-it-academy-auth';
const AUTH_SECRET = 'e6701c92-27af-5305-92b6-cd1276ad635c';

function generateAuthCookie(username) {
  const oneDay = 1000 * 60 * 60 * 24;
  const cookieValue = sha3(`${AUTH_SECRET}-${username}`).toString();

  return [
    AUTH_COOKIE,
    cookieValue,
    {
      expires: new Date(Date.now() + oneDay),
      httpOnly: true,
    },
  ];
}

function parseAuthCookie(username) {
  return sha3(`${AUTH_SECRET}-${username}`).toString();
}

module.exports = {
  AUTH_COOKIE,
  AUTH_SECRET,
  generateAuthCookie,
  parseAuthCookie,
};
