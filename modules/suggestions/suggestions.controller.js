import Suggestion from "./suggestions.model.js";

export const postSuggestion = async(req, res, next) =>{
    const {subject, message, email, name} = req.body;
    try{
        const suggestion = new Suggestion({
            userName: name,
            email: email,
            subject: subject,
            message: message,
            
        })
        await suggestion.save();
        res.status(201).json({
            message: 'Suggestion submitted sucessfully'
        })
    }
    catch(err){
        next(err)
    }

}