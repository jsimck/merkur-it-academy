const express = require('express');

const {
  generateAuthCookie,
  AUTH_COOKIE,
  parseAuthCookie,
} = require('./authUtils');

const UserDB = require('../../mocks/users.json');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req?.body ?? {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Either password or username is invalid.' });
    }

    const user = UserDB[username];

    if (!user) {
      return res
        .status(400)
        .json({ message: `User with ${username} not found.` });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const userCopy = { ...user };
    delete userCopy.password;

    res
      .status(200)
      .cookie(...generateAuthCookie(username))
      .json({
        data: {
          user: userCopy,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/check', async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies) {
      return res
        .status(401)
        .json({ message: 'Received empty cookies with user request.' });
    }

    const authCookie = cookies[AUTH_COOKIE];

    if (!authCookie) {
      return res
        .status(401)
        .json({ message: 'No auth cookie present on user request.' });
    }

    const username = Object.keys(UserDB).find(
      (username) => authCookie === parseAuthCookie(username)
    );

    if (!username) {
      return res.status(401).json({ message: 'Invalid auth cookie' });
    }

    const userCopy = { ...UserDB[username] };
    delete userCopy.password;

    res
      .status(200)
      .cookie(...generateAuthCookie(username))
      .json({
        data: {
          user: userCopy,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.status(200).clearCookie(AUTH_COOKIE).end();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = () => ({ router });
