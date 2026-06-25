const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function userRegisterController(req, res) {
    try {
        const { email, password, name } = req.body

        // Check if user already exists
        const isExists = await userModel.findOne({ email })

        if (isExists) {
            return res.status(422).json({
                message: "User already exists",
                status: "failed"
            })
        }

        // Create new user
        const user = await userModel.create({ email, name, password })

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, 
              email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        // Send success response
        res.status(201).json({
            message: "User registered successfully",
            status: "success",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            status: "error",
            error: error.message
        })
    }
}

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body

        // Find user and include password field (select:false by default)
        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "failed"
            })
        }

        // Compare password
        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "failed"
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        // Send success response
        res.status(200).json({
            message: "Login successful",
            status: "success",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            status: "error",
            error: error.message
        })
    }
}

module.exports = { userRegisterController, userLoginController }