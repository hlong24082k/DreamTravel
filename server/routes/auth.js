const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")
const { json } = require("body-parser")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

/* User Register */
router.post("/register", upload.single('profileImage'), async(req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, profileImage } = req.body
        
        if(!profileImage) {
            return res.status(400).send("No file uploaded")
        }

        const profileImagePath = profileImage

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" })
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profileImagePath
        })

        await newUser.save()
        res.status(200).json({ message: "User registered successfully!", user: newUser})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Registration failed", error: err.message})
    }
});

/* User Login */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        /* Check User exist */
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409).json({ message: "User doesn't exists!" })
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" })
        }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message})
    }
})


module.exports = router
