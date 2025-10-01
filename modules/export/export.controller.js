import ExportedPdf from '../../shared/models/exportedPdf.model.js';

// Store PDF export
export const storePdfExport = async (req, res, next) => {
    try {
        console.log('PDF export request received:', {
            fileName: req.body.fileName,
            categoryName: req.body.categoryName,
            pdfBase64Length: req.body.pdfBase64?.length || 0
        });

        const { fileName, categoryName, pdfBase64 } = req.body;
        
        if (!fileName || !categoryName || !pdfBase64) {
            console.log('Missing required fields:', { fileName, categoryName, hasPdfBase64: !!pdfBase64 });
            return res.status(400).json({
                message: 'Missing required fields: fileName, categoryName, pdfBase64'
            });
        }

        // Convert base64 to buffer
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        const fileSize = pdfBuffer.length;

        // Get user info
        const userAgent = req.get('User-Agent') || '';
        const ipAddress = req.ip || req.connection.remoteAddress || '';

        const exportedPdf = new ExportedPdf({
            fileName,
            categoryName,
            pdfBuffer,
            fileSize,
            userAgent,
            ipAddress
        });

        await exportedPdf.save();

        console.log('PDF saved successfully:', {
            id: exportedPdf._id,
            fileName: exportedPdf.fileName,
            fileSize: exportedPdf.fileSize
        });

        res.status(201).json({
            message: 'PDF export stored successfully',
            id: exportedPdf._id,
            fileName: exportedPdf.fileName,
            categoryName: exportedPdf.categoryName,
            fileSize: exportedPdf.fileSize,
            exportedAt: exportedPdf.exportedAt
        });

    } catch (err) {
        next(err);
    }
};

// Get all PDF exports for admin
export const getAllPdfExports = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        // Get exports without the actual PDF buffer to save bandwidth
        const exports = await ExportedPdf.find({}, {
            pdfBuffer: 0 // Exclude the large buffer field
        })
        .sort({ exportedAt: -1 })
        .skip(skip)
        .limit(limit);

        const totalCount = await ExportedPdf.countDocuments();

        res.status(200).json({
            message: 'PDF exports retrieved successfully',
            exports,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                hasNext: page < Math.ceil(totalCount / limit),
                hasPrev: page > 1
            }
        });

    } catch (err) {
        next(err);
    }
};

// Get specific PDF file
export const getPdfFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const exportedPdf = await ExportedPdf.findById(id);

        if (!exportedPdf) {
            return res.status(404).json({
                message: 'PDF not found'
            });
        }

        // Set appropriate headers for PDF download
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${exportedPdf.fileName}"`,
            'Content-Length': exportedPdf.fileSize
        });

        res.send(exportedPdf.pdfBuffer);

    } catch (err) {
        next(err);
    }
};

// Delete PDF export
export const deletePdfExport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPdf = await ExportedPdf.findByIdAndDelete(id);

        if (!deletedPdf) {
            return res.status(404).json({
                message: 'PDF not found'
            });
        }

        res.status(200).json({
            message: 'PDF export deleted successfully',
            fileName: deletedPdf.fileName
        });

    } catch (err) {
        next(err);
    }
};

// Get export statistics
export const getExportStats = async (req, res, next) => {
    try {
        const totalExports = await ExportedPdf.countDocuments();
        const totalSizeMB = await ExportedPdf.aggregate([
            {
                $group: {
                    _id: null,
                    totalSize: { $sum: '$fileSize' }
                }
            }
        ]);

        const categoryStats = await ExportedPdf.aggregate([
            {
                $group: {
                    _id: '$categoryName',
                    count: { $sum: 1 },
                    totalSize: { $sum: '$fileSize' },
                    latestExport: { $max: '$exportedAt' }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const recentExports = await ExportedPdf.find({}, {
            pdfBuffer: 0
        })
        .sort({ exportedAt: -1 })
        .limit(10);

        res.status(200).json({
            message: 'Export statistics retrieved successfully',
            stats: {
                totalExports,
                totalSizeMB: totalSizeMB[0] ? Math.round(totalSizeMB[0].totalSize / (1024 * 1024) * 100) / 100 : 0,
                categoryStats,
                recentExports
            }
        });

    } catch (err) {
        next(err);
    }
};