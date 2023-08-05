// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../../middleware/dbconnect"
import Message from "../../../../models/Message";
import User from "../../../../models/User";
const handler = async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
    const {message_id, inote_id, from} = req.body;

    if(!message_id || message_id == ""){
        return res.status(400).json({success:false, err: "Some unknown error ocuured", b: req.body})
    }
    else if(!inote_id || inote_id == ""){
        return res.status(400).json({success:false, err: "Some unknown error ocuured", b: req.body})
    }
    else if(!from || from == ""){
        return res.status(400).json({success:false, err: "Some unknown error ocuured", b: req.body})
    }
    let msgi = await Message.findById(message_id);
    if(!msgi){
        return res.status(200).json({success:false, err: "Message don't exist. Try again later."})

    }
    let delmsg = await Message.findByIdAndDelete(message_id)
    if(from){
    let userfrom = await User.findOneAndUpdate({mailAddress:inote_id} , {$inc: {messagesSent: -1}})
    }
    return res.status(200).json({success:true, delmsg})
}else{
    return res.status(400).json({success:false, err: "NOT ALLOWED"})
}
    }else{
        res.send()
    }
}


export default connectDb(handler);