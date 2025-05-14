import User from '../../shared/models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// registration controllers


export const postRegistration =async(req, res, next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.findOne({email: email})
        if(user){
            return res.status(200).json({
                message: 'E-mail address already exist please enter a valid email.'
            })
        
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            
        
        })
        await newUser.save();
        res.status(201).json({
            message: 'Registration sucessfull'
        })
    }catch(err){
        next(err);

    }

}

// password reset

export const resetPassword = async(req, res, next)=>{
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const email = req.user.email;
   try{
       const user = await User.findOne({email: email});
       const isValid = await bcrypt.compare(currentPassword,user.password)
       if(!isValid){
        res.status(200).json({
            message: 'Current password is not matched. Please enter correct current password.'
        })

       }
       const hashedPassword = bcrypt.hash(newPassword,12)
       user.password = hashedPassword;
       await user.save();
       res.status(201).json({
        message: 'Passward reset sucessfull'
       })
   }
   catch(err){
        next(err)
   }
}

// login controller

export const postLogin = async(req, res, next)=>{
    const {email, password, rememberMe} = req.body;
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(200).json({
                message: 'Invalid email'
            })
        }
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            return res.status(200).json({
                message: 'Wrong password'
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
        process.env.JWT_KEY,
        {
           
            expiresIn: rememberMe? '30d':'1h'
        })

        res.status(200).json({
            token: token
        })



    }
    catch(err){
        next(err)
    }


}
