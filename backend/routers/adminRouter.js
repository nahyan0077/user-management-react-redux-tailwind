const express = require('express');
const router = express.Router()

const adminController = require('../controllers/adminController')

router.get('/fetch-user-admin',adminController.fetchUserAdmin)
router.post('/edit-user',adminController.editUser)
router.delete('/delete-user',adminController.deleteUser)
router.post('/add-new-user',adminController.addNewUser)

module.exports = router