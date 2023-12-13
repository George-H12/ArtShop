import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    paintingsBought: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post', // Reference to the Post model
        },
    ],

    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;