import jwt from 'jsonwebtoken'
export const signToken = (id:string)=>{
   return jwt.sign({id},process.env.JWT_SECTET_KEY as string,{
        expiresIn:"30d"
    })
}