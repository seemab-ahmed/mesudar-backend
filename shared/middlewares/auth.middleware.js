import jwt from 'jsonwebtoken';

export const auth = (req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.json({
            message: 'Access denied. No token'
        })
    
    }
     try{
        const decoded = jwt.verify (token, process.env.JWT_KEY);

        req.user= decoded;

        next();

     }
     catch(err){
        next(err)
     }
    
      
}