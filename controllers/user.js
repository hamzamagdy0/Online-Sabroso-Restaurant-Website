const User = require('../models/user'); // Replace 'user' with your actual user model
const path = require('path');

const AddUser = (req, res) => {
    let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files.img;
    uploadPath = path.join(__dirname, '../public/images/' + req.body.username + '.png');

    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
        if (err)
            res.status(500).send(err);

        const newUser = new User({
            UserName: req.body.username,
            Password: req.body.password,
            Image: req.body.username + '.png',
            Type: req.body.type
        });

        newUser.save()
            .then(result => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Failed to add user');
            });
    });
};

const GetUser = (req, res) => {
    const query = { UserName: req.body.username, Password: req.body.password };
    User.findOne(query)
        .then(result => {
            if (!result) {
                res.status(404).send('User not found');
            } else {
                req.session.user = result;
                res.redirect('/user/profile');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to retrieve user');
        });
};

const checkUN = (req, res) => {
    const query = { UserName: req.body.username };
    User.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            } else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to check username');
        });
};

const editUser = (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, { Password: req.body.password })
        .then(result => {
            req.session.user.Password = req.body.password;
            res.redirect('/user/profile');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to edit user');
        });
};

module.exports = {
    AddUser,
    GetUser,
    checkUN,
    editUser
};
