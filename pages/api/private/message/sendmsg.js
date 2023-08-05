// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../../middleware/dbconnect"
import Message from "../../../../models/Message";
import User from "../../../../models/User"
const handler = async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
        const {subject, body, to, from} = req.body;
        const userto = await User.findOne({mailAddress: to})
        if(!userto){
            return res.status(400).json({success: false, err: `The user at ${to} address doesn't exist. Check if it is correct or contact our support.`})
        }
        let userfrom = await User.findOne({mailAddress: from});
        if(!userfrom){
            return res.status(400).json({success: false, err: "You have reached your messages sending limit. Please upgrade your plan"})
        }
        if(userfrom.messagesSent >= userfrom.messagesAllowed){
            return res.status(400).json({success: false, err: "You have reached your messages sending limit. Please upgrade your plan"})
        }
        if(!subject || subject == ""){
            return res.status(400).json({success: false, err: "Subject can't be empty"})
        }
        else if(!body || body == ""){
            return res.status(400).json({success: false, err: "Body can't be empty"})
        }
        else if(!to || to == ""){
            return res.status(400).json({success: false, err: "To (Mail id) can't be empty"})
        }
        else if(!from || from == ""){
            return res.status(400).json({success: false, err: "Some unknown error occured"})
        }
        const msg = new Message({
            subject,
            body,
            to,
            from,
            userto: userto._id,
            userfrom: userfrom._id
        })
        await msg.save();
        userfrom = await User.findByIdAndUpdate(userfrom._id, {$inc: {messagesSent: 1}}, {new: true});
        return res.status(200).json({success:true, userto})
    }
}
else{
    res.send()
}
}

export default connectDb(handler);