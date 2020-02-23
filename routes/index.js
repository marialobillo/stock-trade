const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/users', controllers.createUser);

router.get('/users', controllers.getAllUsers);
router.get('/users/:userId', controllers.getUserById);
router.put('/users/:userId', controllers.updateUser);
router.delete('/users/:userId', controllers.deleteUser);

module.exports = router;