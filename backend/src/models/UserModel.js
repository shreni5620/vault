const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    contactNum: { type: String, required: true },
    status: { type: String, default: 'active' },
    password: { type: String, required: true },
    role: { type: String, default: 'Customer' }
})

module.exports = mongoose.model("User", userSchema)