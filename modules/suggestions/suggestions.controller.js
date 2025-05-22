import Suggestion from "./suggestions.model.js";

export const postSuggestion = async(req, res, next) =>{
    const title = req.body.title;
    const message = req.body.description;
    try{
        const suggestion = new Suggestion({
            title: title,
            description: message
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