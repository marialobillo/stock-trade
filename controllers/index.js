const models = require('../database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 100) + (60 * 60 * 24),
      userId: user.id
    }, process.env.SECRET);
    return res.status(201).json({
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findAll({
      where: { email, password }
    });
    const userId = user[0].dataValues.id;
    if (user) {

      let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        userId: userId
      }, process.env.SECRET);
      return res.status(200).json({
        user,
        token
      });
    }
    return res.status(404).send('Email or Password are incorrect. Try again.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  whoami
}