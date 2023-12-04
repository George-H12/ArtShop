import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const {username, password} = req.body;
    const newUser = new User({username, password})
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error){
        next(errorHandler(550, "error from the function"));
    }   

}