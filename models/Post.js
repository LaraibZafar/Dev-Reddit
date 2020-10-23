const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    //Fetching Name & avatar so that even if the
    //user deletes their account we still have their
    //posts => we're storing these two things locally.
    
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    likes:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text:{
            type: String,
            required: true
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("post", PostSchema);