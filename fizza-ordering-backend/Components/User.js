const User = require("../Model/User.js");

exports.userReg = async (req, res) => {
    try{
        const newUser = new User ( {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json({
            err: err
        })
    }
}

exports.userLogin = async (req, res) => {
    try{
        const user = await User.findOne({ userName: req.body.userName, password: req.body.password });
        if(!user){
            res.status(400).json("Username and password is incorrect!...")
        }else{
            res.status(200).json(user);
        }

    } catch (err) {
        console.log(err)
    }
}