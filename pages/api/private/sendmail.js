import nodemailer from "nodemailer"
import ForgotReq from "../../../models/ForgotRequest"
import SignupReq from "../../../models/SignupReq"
import User from "../../../models/User"
import connectDb from "../../../middleware/dbconnect"
import {OAuth2Client} from 'google-auth-library'
const client = new OAuth2Client("94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com");
async function handler(req, res) {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
        return res.status(200).json({});
    }
    if(req.headers['authorization'] == process.env.API_VERIFY){

    if (req.body.forgotPass) {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ success: false, error: "User not exists" })
            }
            let id = Math.floor(Math.floor(Math.random() * Date.now()) / 100)
            let newreq = new ForgotReq({
                email: req.body.email,
                forgotreqid: id
            })
            await newreq.save()
            let transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                "secure" : true,
                port: 465,
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL,
                    pass: process.env.PASS
                }
            });

            let mailOptions = {
                from: process.env.NEXT_PUBLIC_EMAIL,
                to: req.body.email,
                html:
                    `
                    <!doctype html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        h1{
                            font-family: cursive;
                            font-size: 30px;
                        }
                        p{
                            font-family: cursive;
                        }
                        footer{
                            font-size: larger;
                            font-family: cursive;
                        }
                        </style>
                    </head>
                    <body>
                    <h1>
                        ToolsApp.site Request for Password Reset
                    </h1>
                    <p>
                    <p>We have recieved a request for your password Reset.</p>
                    <p>Your Password Reset url is: https://toolsapp.site/forgotc?id=${id}</p>
                    <p>If it is not you, then just ignore this mail</p>
                    </p>
                    <br/>
                    <footer>
                    Thank you,<br/>
                    Toolsapp.site Team
                    </footer>
                    </body>
                    </html>
        `,
                subject: 'Regarding password reset request ToolsApp.site'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({ success: true })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ success: false, error: e })
        }
    }
    else if (req.body.google == true) {
        try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.response.credential,
            audience: "94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com",
        });
        const object = ticket.getPayload();
        let user = await User.findOne({ email: object.email })
        if (user) {
            return res.status(406).json({ success: false, error: "Your account has been already created. Please sign in." })
        }
        let id = Math.floor(Math.floor(Math.random() * Date.now()) / 100)
        let newreq = new SignupReq({
            email: object.email,
            reqid: id
        })
        await newreq.save()
        return res.status(200).json({reqid: id, success:true})
    }catch(merror){
        return res.status(400).json({ success: false, error: "Some error has been occured on our side. Sorry for inconvenience.", merror })
    }
    }
    else if(req.body.signup == true){
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.zoho.in",
                "secure" : true,
                port: 465,
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL,
                    pass: process.env.PASS
                }
            });
            let mailOptions = {
                from: process.env.NEXT_PUBLIC_EMAIL,
                to: req.body.email,
                html:
                    `
                    <!doctype html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                    h1{
                        font-family: cursive;
                        font-size: 30px;
                    }
                    p{
                        font-family: cursive;
                    }
                    footer{
                        font-size: larger;
                        font-family: cursive;
                    }
                    </style>
                    </head>
                    <body>
                    <h1 class="text-3xl font-bold underline">
                        Your account has been successfully created.
                    </h1>
                    <p>
                    Account details are as follows:-</p>
                    <p>Email : ${req.body.email}</p> 
                    <p>Password: Not shown for security purposes</p> 
                    <p>Explore 100+ Tools on our site.</p> 
                    <p>Home:- https://toolsapp.site</p> 
                    <p>Send a message:- https://toolsapp.site/message</p> 
                    <p>Create and save note:- https://toolsapp.site/notes</p> 
                    </p>
                    <br/>
                    <footer>
                    Thank you,<br/>
                    Toolsapp.site Team
                    </footer>
                    </body>
                    </html>
                `,
                subject: 'You have successfully created an account on toolsapp.site'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ success: false, error})
                } else {
                    return res.status(200).json({ success: true, info })
                }
            });

        }catch(error){
            return res.status(500).json({ success: false, error: e })
        }
    }
    else {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(406).json({ success: false, error: "User already exists" })
            }
            let id = Math.floor(Math.floor(Math.random() * Date.now()) / 100)
            let newreq = new SignupReq({
                email: req.body.email,
                reqid: id
            })
            await newreq.save()
            let transporter = nodemailer.createTransport({
                host: "smtp.zoho.in",
                "secure" : true,
                port: 465,
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL,
                    pass: process.env.PASS
                }
            });

            let mailOptions = {
                from: process.env.NEXT_PUBLIC_EMAIL,
                to: req.body.email,
                html:
                    `
                <!doctype html>
                <html>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                h1{
                    font-family: cursive;
                    font-size: 30px;
                }
                p{
                    font-family: cursive;
                }
                footer{
                    font-size: larger;
                    font-family: cursive;
                }
                </style>
                </head>
                <body>
                <h1 class="text-3xl font-bold underline">
                    ToolsApp.site Request for Signup
                </h1>
                <p class="text-xl">
                <p>We have recieved a request for your Signup.</p>
                <p>Your Signup url is: https://toolsapp.site/signupc?id=${id}</p>

                <p class="leading-relaxed">If it is not you, then just ignore this mail</p>
                </p>
                <br/>
                <footer>
                Thank you,<br/>
                Toolsapp.site Team
                </footer>
                </body>
                </html>
                `,
                subject: 'Regarding signup request ToolsApp.site'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    return res.status(400).json({ success: false, error: error})
                } else {
                    return res.status(200).json({ success: true, info })
                }
            });
        } catch (e) {
            console.log(e)
            return res.status(500).json({ success: false, error: e })
        }
    }
}
else{
    res.send()
}
}
export default connectDb(handler)

