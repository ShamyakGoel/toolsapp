const mongoose = require('mongoose');

const ForotReqSchema = new mongoose.Schema({
    email: {type:String,required:true},
    forgotreqid: {type:String,required:true}
}, {timestamps:true});
export default mongoose.models.ForgotRequest || mongoose.model('ForgotRequest', ForotReqSchema)