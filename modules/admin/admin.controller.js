import {Category, SubCategory, Task} from '../../shared/models/checklist.model.js';
import { reorder } from '../../shared/utils/admin.utils.js';


export const getCategories = async(req, res, next)=>{


    try{
        const categories = await Category.find();

        if(categories.length>0){
            res.status(200).json({
                message: 'These are categories',
                categories: categories
            })
            return;
        }
        res.status(200).json({
            message: 'No category added yet'
        })

    }
    catch(err){
    next(err);
    }
};

export const createCategory=async(req,res,next)=>{

    const categoryTitle = req.body.categoryTitle;
    const category = new Category({
        categoryTitle: categoryTitle,
    
       
    })
    try{
    const saved = await category.save();
    res.status(201).json({
        message:'Category added sucessfully',
        result: saved
    })}
    catch(err){
        next(err);
    }
};

export const editCatagory= async(req, res, next)=>{
    const catId = req.params.catId;
    const updatedTitle = req.body.categoryTitle;
    try{
        const category = await Category.findOne({_id: catId})
        if(category){
            category.categoryTitle= updatedTitle;
            await category.save();
            res.status(200).json({
                message: 'Category updated sucessfully'
            })
            return;
        }
        res.status(200).json({
            message: 'No categories found to be edit'
        })
    }
    catch(err){
        next(err)

    }
};

export const deleteCategory=async(req, res, next)=>{
    const catId = req.params.catId;
    try{
        await Category.findByIdAndDelete({_id: catId})
        res.status(200).json({
            message: 'Category deleted sucessfully'
        })
    }
    catch(err){
        next(err)

    }
    
};

export const reorderCategory = async (req, res, next) => {
  const categoryOrder = req.body.categoryOrder; // array of _id's

  try {
    // Step 1: Fetch all categories whose _id is in categoryOrder
    const categories = await Category.find({
      _id: { $in: categoryOrder }
    });

    // Step 2: Reorder based on categoryOrder
    const categoryMap = new Map();
    categories.forEach((cat) => {
      categoryMap.set(cat._id.toString(), cat); // map category by _id
    });

    const reorderedCategories = categoryOrder.map((id) =>
      categoryMap.get(id)
    );

    // Step 3: Save the reordered categories in the DB
    // This is where you update the order of the documents in the DB
    const operations = reorderedCategories.map((category, index) => ({
      updateOne: {
        filter: { _id: category._id },
        update: { $set: { order: index } }, // You can add any additional updates here
      },
    }));

    // Execute all update operations
    await Category.bulkWrite(operations);

    res.status(200).json({
      message: 'Categories reordered successfully!',
      categories: reorderedCategories, // Optionally send back the reordered list
    });
  } catch (err) {
    next(err);
  }
};

// sub-Categories controllers

export const addSubCategory = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCategoryTitle = req.body.subCategoryTitle;
    const subCategory = new SubCategory({
        subCategoryTitle: subCategoryTitle,
    })

    try{
        const category = await Category.findById({_id: catId});
        category.subCategory.push(subCategory)
        const result = await category.save();
        res.status(201).json({
            message: 'Sub-Category added sucessfully',
            addedCategory: result

        })

    }catch(err){
        next(err)

    }
};


export const editSubCategory = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
    const subCategoryTitle = req.body.subCategoryTitle;
    

    try{
        const category = await Category.findById({_id: catId});
        const newSubCategory= category.subCategory.map(subCatItem=>{
              if(subCatItem._id.toString()== subCatId.toString()){
                return { ...subCatItem.toObject(), subCategoryTitle: subCategoryTitle}
              };
              return subCatItem;
        })

        category.subCategory = newSubCategory;
        const result = await category.save();
        res.status(201).json({
            message: 'Sub-Category updated sucessfully',
            addedCategory: result

        })

    }catch(err){
        next(err)

    }
};

export const deleteSubCategory = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
   
    

    try{
        const category = await Category.findById({_id: catId});
        const newSubCategory= category.subCategory.filter(subCatItem=>{
             return subCatItem._id.toString() !== subCatId.toString();
        })
        category.subCategory = newSubCategory;
        const result = await category.save();
        res.status(201).json({
            message: 'Sub-Category deleted sucessfully',
            addedCategory: result

        })

    }catch(err){
        next(err)

    }
};

export const reorderSubCategory = async(req, res, next)=>{
     const {catId} = req.params;
    const subCategoryOrder = req.body.subCategoryOrder;

    try{
        const category = await Category.findOne({_id: catId});
        
        const reorderedSubCategory = reorder(subCategoryOrder,category.subCategory)
        category.subCategory = reorderedSubCategory;
        await category.save();
        res.status(200).json({
            message: 'Sub Categorires re-arranged'
        })
    }
    catch(err){
        next(err)
    }



}

// task controllers
export const addTask = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
    const taskTitle = req.body.taskTitle;
    const task = new Task({
        taskTitle: taskTitle
    })

    try{
        const category = await Category.findById({_id: catId});
        const subCategoryItem = category.subCategory.find(item=>item._id.toString()===subCatId.toString());
        subCategoryItem.tasks.push(task);
        const index = category.subCategory.findIndex(item=>item._id.toString()===subCategoryItem._id.toString());
        category.subCategory[index] = subCategoryItem;
        const result = await category.save();
        res.status(201).json({
            message: 'Task added sucessfully',
            result: result
        })

    }catch(err){
        next(err)
    }
};

export const editTask = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
    const taskId = req.params.taskId;
    const taskTitle = req.body.taskTitle;
    
    try{
        const category = await Category.findById({_id: catId});

        const subCategoryItem = category.subCategory.find(item=>item._id.toString()===subCatId.toString());

        const task = subCategoryItem.tasks.find(item=>item._id.toString() === taskId.toString());

        task.taskTitle = taskTitle;

        const result = await category.save();

        res.status(201).json({
            message: 'Task updated sucessfully',
            result: result
        })

    }catch(err){
        next(err)
    }
};

export const deleteTask = async(req, res, next)=>{
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
    const taskId = req.params.taskId;
   
    
    try{
        const category = await Category.findById({_id: catId});

        const subCategoryItem = category.subCategory.find(item=>item._id.toString()===subCatId.toString());

        const updatedtask = subCategoryItem.tasks.filter(item=>item._id.toString() !== taskId.toString());

        subCategoryItem.tasks=updatedtask;

        const result = await category.save();

        res.status(201).json({
            message: 'Task deleted sucessfully',
            result: result
        })

    }catch(err){
        next(err)
    }
};

export const updateTaskArray = async(req, res, next)=>{
    const {catId, subCatId} = req.params;
    const taskOrder = req.body.taskOrder;

    try{
        const category = await Category.findOne({_id: catId});
        const subcategory = category.subCategory.find(item=>item._id.toString()===subCatId.toString());
        const reorderedTasks = reorder(taskOrder,subcategory.tasks)
        subcategory.tasks = reorderedTasks;
        await category.save();
        res.status(200).json({
            message: 'Tasks re-arranged'
        })
    }
    catch(err){
        next(err)
    }
}