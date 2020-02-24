const models = require('../database/models');

const createTransaction = async (req, res) => {
  try {
    const transaction = await models.Transaction.create(req.body);
    return res.status(201).json({
      transaction,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllTransactions = async (req, res) => {
    try {
      const transactions = await models.Transaction.findAll({raw: true});
      return res.status(200).json({ transactions });
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const getTransactionById = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transaction = await models.Transaction.findOne({
        where: { id: transactionId }
      });
      if (transaction) {
        return res.status(200).json({ transaction });
      }
      return res.status(404).send('Transaction with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const updateTransaction = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const [ updated ] = await models.Transaction.update(req.body, {
        where: { id: transactionId }
      });
      if (updated) {
        const updatedTransaction = await models.Transaction.findOne({ where: { id: transactionId } });
        return res.status(200).json({ transaction: updatedTransaction });
      }
      throw new Error('Transaction not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const deleteTransaction = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const deleted = await models.Transaction.destroy({
        where: { id: transactionId }
      });
      if (deleted) {
        return res.status(204).send("Transaction deleted");
      }
      throw new Error("Transaction not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
}