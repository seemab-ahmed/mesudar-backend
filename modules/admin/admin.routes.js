import express from 'express';
import {createCategory , editCatagory, getCategories,deleteCategory,
        addSubCategory, editSubCategory, deleteSubCategory,
        addTask, editTask, deleteTask} from '../admin/admin.controller.js';

const router = express.Router();

router.get('/categories',getCategories)

router.post('/category/create',createCategory)

router.put('/category/edit/:catId', editCatagory)

router.delete('/category/delete/:catId', deleteCategory)

// sub-category routes

router.post('/subcategory/:catId', addSubCategory)

router.put('/subcategory/:catId/:subCatId', editSubCategory)

router.delete('/subcategory/:catId/:subCatId', deleteSubCategory)

// task routes

router.post('/task/:catId/:subCatId', addTask)

router.put('/task/:catId/:subCatId/:taskId', editTask)

router.delete('/task/:catId/:subCatId/:taskId', deleteTask)

export default router;