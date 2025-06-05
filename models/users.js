const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true // Ensure emails are unique
        },
        Password: {
            type: String,
            required: true
        },
        PhoneNo: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
            required: true
        }
    },
    { timestamps: true }
);

// Hash password before saving to database if modified
UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('Password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.Password, salt);
        user.Password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };



const User = mongoose.model('User', UserSchema);

module.exports = User;
