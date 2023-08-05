// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/dbconnect"
import Contact from "../../../models/Contact"
const handler = async (req, res)=>{
    if(req.headers['authorization'] == process.env.API_VERIFY){
    if(req.method == "POST"){
        const {name,email,message} = req.body
        if(!name || name == ""){
            return res.status(400).json({err: "Cannot process your request. Name can't be blank. Please try later", success:false})
        }
        else if(!email || email == ""){
            return res.status(400).json({err: "Cannot process your request. Email can't be blank. Please try later", success:false})
        }
        else if(!message || message == ""){
            return res.status(400).json({err: "Cannot process your request. Message can't be blank. Please try later", success:false})
        }
        else{            
            let contact = new Contact({
                name,
                email,
                message
            })
            await contact.save();
            return res.status(200).json({contact, success:true});

        }
    }
    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        return res.status(200).json({});
    }
}
else{
    res.send();
}
    // res.status(200).json({ name: 'John Doe' })
}


export default connectDb(handler);