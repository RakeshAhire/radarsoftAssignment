const { UserModel } = require("../models/user.model");

const getAllUser = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users)
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

const getSingleUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    // console.log('req.body: ', req.body);
    try {
        const updatedeUser = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        // in this method whatever value we want to update
        res.status(200).json(updatedeUser)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    // console.log('id: ', id);
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User has been deleted" })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllUser, getSingleUser, updateUser, deleteUser }