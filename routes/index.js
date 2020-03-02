const { Router } = require('express');
const UserController = require('../controllers/users');
const HoldingController = require('../controllers/holdings');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

// User routes
router.post('/users/register', UserController.registerUser); // Register User
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

router.post('/login', UserController.loginUser); // Login User
router.post('/whoami', UserController.whoami); // Checking token exists on http headers

// Holdings routes
router.post('/holdings', HoldingController.createHolding);
router.get('/holdings', HoldingController.getAllHoldings);
router.get('/holdings/:userId', HoldingController.getHoldingsByUser);
router.get('/holdings/byId/:holdingId', HoldingController.getHoldingById);
router.put('/holdings/:holdingId', HoldingController.updateHolding);
router.delete('/holdings/:holdingId', HoldingController.deleteHolding);

router.get('/symbols', HoldingController.getSymbols);

module.exports = router;