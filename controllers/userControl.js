const { json } = require("express");
const users = require("../Models/userModel");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(400).json("User Already Exists!! Please Login.");
        } else {
            const newUser = new users({
                userName,
                email,
                password
            });

            // Store the new object in the db collection
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(`Register API Failed ${err}`);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            // Login success - generate token
            const token = jwt.sign({ _id: existUser._id }, "supersecretkey123");

            res.status(200).json({
                user: existUser,
                token
            });
        } else {
            res.status(404).json("Incorrect email or password");
        }
    } catch (err) {
        res.status(401).json(`Login API Failed ${err}`);
    }
};
