const users = require('../model/userModel')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs')

module.exports = {
    postSignUp: async (req, res) => {
        try {

            const { username, email, password } = req.body
            const userExist = await users.findOne({ email: email })

            if (userExist) {
                return res.json({ error: "User already exists" });
            } else {

                const newUser = new users({
                    name: username,
                    email,
                    role: "user",
                    password
                })

                const savedUser = await newUser.save()

                const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

                

                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                }).json({ success: true });
            }

        } catch (error) {
            console.error("Error occurred during sign-up:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    
    fetchUserData: async (req, res) => {
        try {

            const token = req.cookies.token || req.headers.authorization

            // Check if the token exists
            if (!token) {
                return res.status(401).json({ error: "Unauthorized: No token provided" });
            }
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized: Invalid token" });
            }
            const user = await users.findById(decoded.user);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);

        } catch (error) {
            console.error("Error while fetching user data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    userLoginPost: async (req, res) => {
        try {
            const { email, password  } = req.body
            const userExist = await users.findOne({ email: email })
            if (!userExist) {
                return res.json({ emailError: "User does't exists, please signup" });
            }

            const passwordMatch = await bcrypt.compare(password, userExist.password)

            if (!passwordMatch) {
                return res.json({ passwordError: "Password does't match" });
            } else {
                const token = jwt.sign({ user: userExist._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
                console.log(token);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                }).json({ success: true });
            }

        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },


    editProfile : async (req,res) => {
        try {
            const {username : name , bio, email} = req.body

            await users.updateOne({ email : email }, { name : name ,bio : bio })
            
            res.json({ success : true  })

        } catch (error) {
            console.log("Edit Profile",error);
        }
    },


    resetPassword : async (req,res) => {
        try {

            const {currentpassword , password , email } = req.body
            const editUser = await users.findOne({ email : email })

            const passwordMatch = await bcrypt.compare(currentpassword, editUser.password)

            if(!passwordMatch){
                res.json({ error : "Password doesn't match" })
            }else {
                const salt = await bcrypt.genSalt(10);
                const hashedNewPass = await bcrypt.hash(password, salt);
                await users.updateOne({ email : email }, { $set : {password : hashedNewPass} })
                res.json({ success : true })
            }

        } catch (error) {
            console.log("Update password",error);
        }
    },


    uploadProfilePhoto : async (req,res) => {
        try {
            const token = req.cookies.token;
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            const user = await users.findOne({ _id: verified.user });

            if (user.profile != "def_prof.jpg") {
                const imagePath = path.join(__dirname, '../public/', user.profile); 
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            const path_image = req.file.filename
            await users.updateOne({ _id: verified.user }, { $set: { profile: path_image } });
            res.json({ success : true })

        } catch (error) {
            console.log("Profile image upload error",error);
        }
    },

    deleteProfileImage : async (req,res) => {
        try {

            const token = req.cookies.token;

            const verified = jwt.verify(token, process.env.JWT_SECRET);

            const user = await users.findOne({ _id: verified.user });

            if (user.profile != "def_prof.jpg") {
                const imagePath = path.join(__dirname, '../public/', user.profile); 
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await users.updateOne({ _id: verified.user },{$set : { profile : "def_prof.jpg" }});

            res.json({success : true})

        } catch (error) {
            console.log("Delete profile image error",error);
        }
    },



    //logout
    userLogout : (req, res) => {
        res.clearCookie("token").send({ something: "here" });
    }
}