const users = require('../model/userModel')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

module.exports = {
    fetchUserAdmin : async (req,res) => {
        try {
            const { search } = req.query;
            console.log("search....",search);
            let query = { role: { $ne: "admin" } };
            if (search) {
              query.name = { $regex: new RegExp(search, 'i') };
            }
            const data = await users.find(query);
        
            res.json({ data: data });
        } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              error: 'Internal Server Error in the fetchuser to admin',
            });
        }
    },

    editUser : async (req,res) => {
      try {
        console.log(req.body,"edit name...");
        const {username, user_id} = req.body

        await users.updateOne({ _id : user_id }, { $set : { name : username } })
        res.json({ success: true });

      } catch (error) {
        
      }
    },

    deleteUser : async (req,res) => {
      try {
        const { id } = req.body
        await users.deleteOne({ _id : id })
        res.json({ success : true })

      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    },

    addNewUser : async (req,res) => {
      try {
        const {username, email, password} = req.body
        console.log("new user data",req.body);
        const newUser = new users ({
          name : username,
          email,
          role : "user",
          password
        })
        const savedUser = await newUser.save();
        res.json({ success : true })
      } catch (error) {
        console.log(error); 
      }
    }
}
