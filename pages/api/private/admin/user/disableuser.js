// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../../../models/User"
import connectDb from "../../../../../middleware/dbconnect"
const handler = async (req, res) => {
    if(req.headers['authorization'] == process.env.API_VERIFY){
    try{
    if (req.method == "POST") {
        try {
            const { disable, uid } = req.body
            let user;
            if(disable){
                user = await User.findByIdAndUpdate(uid, {disable : true})
            }
            else{
                user = await User.findByIdAndUpdate(uid, {disable : false}) 
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({error: "Some unknown error occured! Sorry for inconvenience.", success: false})
        }
    }

    else if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        return res.status(200).json({});
    }
}catch(error){
    console.error(error)
    return res.status(200).json({error: "Some unknown error occured! Sorry for inconvenience.", success: false, b: req.body, error})
}
    }else{
        res.send()
    }
}

export default connectDb(handler)