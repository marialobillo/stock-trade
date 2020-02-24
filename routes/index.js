const { Router } = require('express');
const UserController = require('../controllers/users');
const SymbolController = require('../controllers/symbols');
const HoldingController = require('../controllers/holdings');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

router.get('/symbols', SymbolController.getAllSymbols);
router.post('/symbols', SymbolController.createSymbol);
router.get('/symbols/:symbolId', SymbolController.getSymbolById);
router.put('/symbols/:symbolId', SymbolController.updateSymbol);
router.delete('/symbols/:symbolId', SymbolController.deleteSymbol);

router.get('/holdings', HoldingController.getAllHoldings);
router.post('/holdings', HoldingController.createHolding);
router.get('/holdings/:holdingId', HoldingController.getHoldingById);
router.put('/holdings/:holdingId', HoldingController.updateHolding);
router.delete('/holdings/:holdingId', HoldingController.deleteHolding);

module.exports = router;