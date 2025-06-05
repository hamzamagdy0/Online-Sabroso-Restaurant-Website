const User = require('../models/user'); // Replace 'user' with your actual user model
const path = require('path');
const fs = require('fs');

const GetAllUsers = (req, res) => {
    User.find()
        .then(result => {
            res.render('viewAll', { users: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to retrieve users');
        });
};

const GetUser = (req, res) => {
    const query = { _id: req.params.id };
    User.findOne(query)
        .then(result => {
            if (!result) {
                res.status(404).send('User not found');
            } else {
                res.render('userDetails', { user: result, userSession: req.session.user });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to retrieve user');
        });
};

const DeleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send('User not found');
            }
            const imagePath = path.join(__dirname, '../public/images/' + result.Image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Failed to delete user');
                }
                res.redirect('/admin/viewAll');
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to delete user');
        });
};

const toAdmin = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { Type: 'admin' })
        .then(result => {
            if (!result) {
                return res.status(404).send('User not found');
            }
            res.redirect('/admin/viewAll');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to update user role');
        });
};

const toClient = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { Type: 'client' })
        .then(result => {
            if (!result) {
                return res.status(404).send('User not found');
            }
            res.redirect('/admin/viewAll');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to update user role');
        });
};

module.exports = {
    GetAllUsers,
    GetUser,
    DeleteUser,
    toAdmin,
    toClient
};
