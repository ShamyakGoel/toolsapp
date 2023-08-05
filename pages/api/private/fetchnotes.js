// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/dbconnect"
import Note from "../../../models/Note"
const handler = async (req, res)=>{
    // if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
        const {emailid} = req.body
        if(!emailid || emailid == ""){
            console.log(req.body)
            return res.status(400).json({err: "Cannot process your request. Please try later", success:false})
        }
        const allNotes = await Note.find({userAssociated: emailid});
        return res.status(200).json({notes:allNotes});
    }
    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.status(200).json({});
    }
    // res.status(200).json({ name: 'John Doe' })
// }
else{
    res.send()
}
}


export default connectDb(handler);