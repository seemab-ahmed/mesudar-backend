import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exportedPdfSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    pdfBuffer: {
        type: Buffer,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    exportedAt: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
        default: ''
    },
    ipAddress: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const ExportedPdf = mongoose.model('exportedPdf', exportedPdfSchema);

export default ExportedPdf;