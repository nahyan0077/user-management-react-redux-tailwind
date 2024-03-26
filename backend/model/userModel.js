const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
      default : "def_prof.jpg"
    },
    bio : {
      type : String,
    },
  },{
    timestamps: true
  });

  userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const user = mongoose.model('User', userSchema);

//Export the model
module.exports = user