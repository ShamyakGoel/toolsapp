// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/dbconnect"
const handler = (req, res)=>{
    res.status(200).json({ name: 'John Doe' })
}


export default connectDb(handler);