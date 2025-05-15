import express from 'express';
import {createCategory , editCatagory, getCategories,deleteCategory,
        addSubCategory, editSubCategory, deleteSubCategory,
        addTask, editTask, deleteTask, updateTaskArray, reorderSubCategory, reorderCategory} from './admin.controller.js';
import {auth} from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

router.get('/categories',getCategories)

router.post('/category/create',createCategory)

router.put('/category/reorder',reorderCategory)

router.put('/category/edit/:catId', editCatagory)

router.delete('/category/delete/:catId', deleteCategory)

// sub-category routes

router.post('/subcategory/:catId', addSubCategory)

router.put('/subcategory/:catId/:subCatId', editSubCategory)

router.delete('/subcategory/:catId/:subCatId', deleteSubCategory)

router.put('/subcategory/:catId', reorderSubCategory)

// task routes

router.post('/task/:catId/:subCatId', addTask)

router.put('/task/:catId/:subCatId/:taskId', editTask)

router.delete('/task/:catId/:subCatId/:taskId', deleteTask)

router.put('/task/:catId/:subCatId', updateTaskArray);



export default router;