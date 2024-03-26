const express = require('express');
const router = express.Router()
const multer = require('multer');

const upload = require("../multer/multerConfig");

const userController = require('../controllers/userController');
const user = require('../model/userModel');




//-----------------user Management--------------

router.post('/signup',userController.postSignUp)
router.get('/fetch-user-data',userController.fetchUserData)
router.post('/login',userController.userLoginPost)
router.get('/logout',userController.userLogout)
router.post('/edit-profile',userController.editProfile)
router.post('/reset-password',userController.resetPassword)
router.post('/upload-profile-photo',upload.single('profile'),userController.uploadProfilePhoto)
router.delete('/delete-profile-image',userController.deleteProfileImage)


module.exports = router