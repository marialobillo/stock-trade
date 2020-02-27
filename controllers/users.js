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
    return res.status(500).json({error: error.message})
  }
}

const getUserForLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await models.User.findOne({
      where: { email, password }
    });
    if(user){
      return res.status(200).json({ user });
    }
    return res.status(404).send('Email or Password are incorrect.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getAllUsers = async (req, res) => {
    try {
      const users = await models.User.findAll({raw: true});
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await models.User.findOne({
        where: { id: userId }
      });
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}



const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const [ updated ] = await models.User.update(req.body, {
        where: { id: userId }
      });
      if (updated) {
        const updatedUser = await models.User.findOne({ where: { id: userId } });
        return res.status(200).json({ user: updatedUser });
      }
      throw new Error('User not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deleted = await models.User.destroy({
        where: { id: userId }
      });
      if (deleted) {
        return res.status(204).send("User deleted");
      }
      throw new Error("User not found");
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
  getUserForLogin,
}