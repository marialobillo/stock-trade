const { Router } = require('express');
const UserController = require('../controllers/users');
const SymbolController = require('../controllers/symbols');
const HoldingController = require('../controllers/holdings');
const TransactionController = require('../controllers/transaction');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

// User routes
router.post('/users/register', UserController.createUser); // Register User
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

router.get('/users/login', UserController.getUserForLogin); // Login User

// Symbol routes
router.get('/symbols', SymbolController.getAllSymbols);
router.post('/symbols', SymbolController.createSymbol);
router.get('/symbols/:symbolId', SymbolController.getSymbolById);
router.put('/symbols/:symbolId', SymbolController.updateSymbol);
router.delete('/symbols/:symbolId', SymbolController.deleteSymbol);

// Holding routes
router.get('/holdings', HoldingController.getAllHoldings);
router.post('/holdings', HoldingController.createHolding); // Buy a Holding
router.get('/holdings/:holdingId', HoldingController.getHoldingById);
router.put('/holdings/:holdingId', HoldingController.updateHolding);
router.delete('/holdings/:holdingId', HoldingController.deleteHolding);
router.get('/holdings/active/:userId', HoldingController.getActiveHoldingsByUserId);

// Transactions routes
router.get('/transactions', TransactionController.getAllTransactions);
router.post('/transactions', TransactionController.createTransaction);
router.get('/transactions/:transactionId', TransactionController.getTransactionById);
router.put('/transactions/:transactionId', TransactionController.updateTransaction);
router.delete('/transactions/:transactionId', TransactionController.deleteTransaction);
router.get('transactions/byHolding/:holdingId');

module.exports = router;