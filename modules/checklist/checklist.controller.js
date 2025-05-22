import { Category } from "../../shared/models/checklist.model.js";
import CategoryOrder from '../../shared/models/catagoryOrder.model.js';
import { reorder } from "../../shared/utils/admin.utils.js";

export const getCategories = async(req, res, next)=>{


    try{
        const categories = await Category.find();

        if(categories.length>0){
         const order = await CategoryOrder.find();
         if(order){

            const OrderedCategories = reorder(order[0].catOrder,categories)
            res.status(200).json({
                message: 'These are categories',
                categories: OrderedCategories
            })
            

         }else{
             res.status(200).json({
                message: 'These are categories',
                categories: categories
            })
         }
            return;
        }
        res.status(200).json({
            message: 'No category added yet'
        })

    }
    catch(err){
    next(err);
    }
};9560
