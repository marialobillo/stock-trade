const models = require('../database/models');

const createHolding = async (req, res) => {
  try {
    const holding = await models.Holding.create(req.body);
    return res.status(201).json({
      holding,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllHoldings = async (req, res) => {
    try {
      const holdings = await models.Holding.findAll({raw: true});
      return res.status(200).json({ holdings });
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const getHoldingById = async (req, res) => {
    try {
      const { holdingId } = req.params;
      const holding = await models.Holding.findOne({
        where: { id: holdingId }
      });
      if (holding) {
        return res.status(200).json({ holding });
      }
      return res.status(404).send('Holding with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const updateHolding = async (req, res) => {
    try {
      const { holdingId } = req.params;
      const [ updated ] = await models.Holding.update(req.body, {
        where: { id: holdingId }
      });
      if (updated) {
        const updatedHolding = await models.Holding.findOne({ where: { id: holdingId } });
        return res.status(200).json({ user: updatedHolding });
      }
      throw new Error('Holding not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const deleteHolding = async (req, res) => {
    try {
      const { holdingId } = req.params;
      const deleted = await models.Holding.destroy({
        where: { id: holdingId }
      });
      if (deleted) {
        return res.status(204).send("Holding deleted");
      }
      throw new Error("Holding not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

module.exports = {
  createHolding,
  getAllHoldings,
  getHoldingById,
  updateHolding,
  deleteHolding,
}