import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModels, {IUser} from "../models/userModels";

const requireAuth = async (req: any,res: Response,next: NextFunction) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Authorization token is required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id}: any = jwt.verify(token, process.env.SECRET as string)
        req.user = await userModels.findOne({_id}).select('_id')
        next()
    }catch (err){
        console.log(err)
        res.status(401).json({error: 'Request is not authorize'})
    }
}
export default requireAuth