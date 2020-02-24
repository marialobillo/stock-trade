const models = require('../database/models');

const createSymbol = async (req, res) => {
  try {
    const symbol = await models.Symbol.create(req.body);
    return res.status(201).json({
      symbol,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllSymbols = async (req, res) => {
    try {
      const symbols = await models.Symbol.findAll({raw: true});
      return res.status(200).json({ symbols });
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const getSymbolById = async (req, res) => {
    try {
      const { symbolId } = req.params;
      const symbol = await models.Symbol.findOne({
        where: { id: symbolId }
      });
      if (symbol) {
        return res.status(200).json({ symbol });
      }
      return res.status(404).send('Symbol with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const updateSymbol = async (req, res) => {
    try {
      const { symbolId } = req.params;
      const [ updated ] = await models.Symbol.update(req.body, {
        where: { id: symbolId }
      });
      if (updated) {
        const updatedSymbol = await models.Symbol.findOne({ where: { id: symbolId } });
        return res.status(200).json({ symbol: updatedSymbol });
      }
      throw new Error('Symbol not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const deleteSymbol = async (req, res) => {
    try {
      const { symbolId } = req.params;
      const deleted = await models.Symbol.destroy({
        where: { id: symbolId }
      });
      if (deleted) {
        return res.status(204).send("Symbol deleted");
      }
      throw new Error("Symbol not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

module.exports = {
  createSymbol,
  getAllSymbols,
  getSymbolById,
  updateSymbol,
  deleteSymbol,
}