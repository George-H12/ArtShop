import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    
    const {username, password} = req.body;
    const validUser = await User.findOne({username})
    if (validUser) return next(errorHandler(404, "User Already Exists!"))
    
    const newUser = new User({username, password})
    try {
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully!"
        });
    } catch (error){
        console.log(error);
        next(errorHandler(550, "error from the function"));
    }   
}

export const signin = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const validUser = await User.findOne({username})

        if (!validUser) return next(errorHandler(404, "User Not Found!"))

        if (password !== validUser.password) return next(errorHandler(401, "Incorrect Credentials!"))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    }catch(error){
        next(error);
    }
}