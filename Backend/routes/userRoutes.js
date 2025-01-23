const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUser);
router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
