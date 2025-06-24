import Suggestion from "./suggestions.model.js";

export const postSuggestion = async(req, res, next) =>{
    const {message, email, name} = req.body;
    try{
        const suggestion = new Suggestion({
            userName: name,
            email: email,
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