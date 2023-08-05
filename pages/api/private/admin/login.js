// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../../models/User"
import jwt from "jsonwebtoken"
import connectDb from "../../../../middleware/dbconnect"
const handler = async (req, res) => {
    if(req.headers['authorization'] == process.env.API_VERIFY){
    try{
    if (req.method == "POST") {
        try {
            const { email, password } = req.body
            let user;
            if(email != "admin@toolsapp.site"){
                return res.status(400).json({error: "Internal server error", success: false})
            }
            else if(password != process.env.PASS){
                return res.status(400).json({error: "Internal server error", success: false})
            }
            else{
            let authtoken = jwt.sign({ loggedin: true }, process.env.JWT_KEY, { expiresIn: '1d' })
            return res.status(200).json({ success: true, authtoken })
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

}
else{
    res.send()
}
}

export default connectDb(handler)