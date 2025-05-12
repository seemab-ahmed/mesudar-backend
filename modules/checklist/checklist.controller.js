import { Category } from "./checklist.model.js"

export const getCategories = async(req, res, next)=>{
    try{
        const categories = await Category.find();
        res.status(200).json({
            message: 'All the categories',
            categories: categories
        })
    }catch(err){
        next(err)
    }
}