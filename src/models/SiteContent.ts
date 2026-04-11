import mongoose, { Schema } from 'mongoose';

// Flexible schema because SiteContent structure is deeply nested and we mostly replace it as a whole
const siteContentSchema = new Schema({}, { strict: false, timestamps: true });

// Avoid compiling the model multiple times in Next.js development mode
export const SiteContentModel = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);
