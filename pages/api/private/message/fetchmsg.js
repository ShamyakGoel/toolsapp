// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../../middleware/dbconnect"
import Message from "../../../../models/Message";
import User from "../../../../models/User";
const handler = async (req, res)=>{
    // if(req.headers['authorization'] == process.env.API_VERIFY){
    const {inote_id, mine} = req.body;
    if(mine == undefined || mine == null){
        return res.status(400).json({})
    }
    let allmsg;
    if(mine){
        allmsg = await Message.find({from: inote_id});
        // console.log()
        await User.findOneAndUpdate({mailAddress: inote_id}, {messagesSent: allmsg.length})
    }
    else{
        allmsg = await Message.find({to: inote_id})
    }
    return res.status(200).json({success:true, allmsg})


}


export default connectDb(handler);