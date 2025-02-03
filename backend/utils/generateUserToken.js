import jwt from 'jsonwebtoken'
const generateUserToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'}) 
}
export default generateUserToken;