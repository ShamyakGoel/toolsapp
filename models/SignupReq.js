const mongoose = require('mongoose');

const SignupReqSchema = new mongoose.Schema({
    email: {type:String,required:true},
    reqid: {type:String,required:true}
}, {timestamps:true});
export default mongoose.models.SignupRequest || mongoose.model('SignupRequest', SignupReqSchema)