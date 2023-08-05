const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    subject: {type:String,required:true},
    body: {type:String,required:true},
    to: {type:String,required:true},
    from: {type:String,required:true},
    userto: {type:mongoose.Types.ObjectId,required:true},
    userfrom: {type:mongoose.Types.ObjectId,required:true},
}, {timestamps:true});
export default mongoose.models.Message || mongoose.model('Message', MessageSchema)