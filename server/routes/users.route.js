const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/allUsers', userController.getAll);
router.get('/get/:id', userController.get);
router.delete('/delete/:id', userController.delete);
router.put('/update/:email', userController.update);
router.put('/updatePassword/:email', userController.changePassword);
router.put('/updatePasswordAdmin/:email', userController.changePasswordAdmin);

module.exports = router;