const express = require("express")
const router = express.Router()
const { userRegisterController, userLoginController } = require("../controller/auth.controller")

// POST /api/auth/register - Register a new user
router.post("/register", userRegisterController)

// POST /api/auth/login - Login an existing user
router.post("/login", userLoginController)

module.exports = router