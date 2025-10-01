import express from 'express';
import { storePdfExport, getAllPdfExports, getPdfFile, deletePdfExport, getExportStats } from './export.controller.js';

const router = express.Router();

// Store PDF export (public route for users)
router.post('/pdf', storePdfExport);

// Admin routes for managing exports
router.get('/admin/pdfs', getAllPdfExports);
router.get('/admin/pdf/:id', getPdfFile);
router.delete('/admin/pdf/:id', deletePdfExport);
router.get('/admin/stats', getExportStats);

export default router;