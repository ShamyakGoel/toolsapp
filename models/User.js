const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        default: 'YOUR-NAME-HERE'
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    notes:[],
    notesCreated:{
        type:Number,
        default: 0
    },
    isProUser:{
        type: Boolean,
        default: false
    },
    notesCreatedAllowed:{
        type: Number,
        default: 200
    },
    messages:[],
    messagesSent:{
        type:Number,
        default: 0
    },
    messagesAllowed:{
        type: Number,
        default: 100
    },
    isVerified:false,
    mailAddress:{
        type:String
    },
    isLoginFirstTime:{
        type : Boolean
    },
    disable:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model('User', UserSchema)