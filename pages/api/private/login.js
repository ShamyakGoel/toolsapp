// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../models/User"
import jwt from "jsonwebtoken"
import connectDb from "../../../middleware/dbconnect"
import bcrypt from "bcryptjs";
import {OAuth2Client} from 'google-auth-library'
const client = new OAuth2Client("94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com");
const handler = async (req, res) => {
    if(req.headers['authorization'] == process.env.API_VERIFY){
    try{
    if (req.method == "POST") {
        if(req.body.google == true){
            try{
                const ticket = await client.verifyIdToken({
                    idToken: req.body.response.credential,
                    audience: "94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com", 
                });
                const object = ticket.getPayload();
                if(!object.email_verified){
                    return res.status(400).json({error: "Please sign in correctly through google or sign in using email.", success: false})
                }
                let user = await User.findOne({ email: object.email })
                if(!user){
                    return res.status(400).json({error: "Please first sign up. Url:- https://toolsapp.site/signup", success: false})
                }
                let authtoken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1d' })
                return res.status(200).json({ success: true, user, authtoken })
            }

            catch(error){
                return res.status(400).json({error: "Some unknown error occured! Sorry for inconvenience.", success: false, error, c: req.body.response.credential})
            }
            
        }
        else{
            
        try {
            const { email, password } = req.body
            let user;
            if (email.includes("@toolsapp.site")) {
                user = await User.findOne({mailAddress: email})
            }
            else{
                user = await User.findOne({ email: email })
            }
            if (!user) {
                return res.status(406).json({ success: false, error: "Please try to login with correct credentials" })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(406).json({ success: false, error: "Please try to login with correct credentials" })
            }
            else {
                let authtoken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1d' })
                res.status(200).json({ success: true, user, authtoken })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: "Some unknown error occured! Sorry for inconvenience.", success: false})
        }
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