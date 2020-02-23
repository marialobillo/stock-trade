const models = require('../database/models');

const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
}