const express = require("express");
const { signupValidator,loginValidator } = require("../utills/validators/authValidator");
const { signup,login,forgotPassword,verifyPassResetCode ,resetPassword} = require("../services/authService");

const router = express.Router();

router.post('/signup',signupValidator, signup);
router.post('/login',loginValidator, login);
router.post('/forgotpassword',forgotPassword);
router.post('/verifyResetCode',verifyPassResetCode);
router.post('/resetPassword',resetPassword);




// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);
module.exports = router;
