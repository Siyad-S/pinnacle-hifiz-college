import connectMongo from '@/lib/mongoose';
import { SiteContentModel } from '@/models/SiteContent';
import { siteContent as fallbackContent } from '@/data/siteContent';
import { SiteContent } from '@/types';

export async function getSiteContent(): Promise<SiteContent> {
    try {
        await connectMongo();
        const data = await SiteContentModel.findOne();
        if (data) {
            const obj = data.toObject();
            delete obj._id;
            delete obj.__v;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj as SiteContent;
        }
    } catch (error) {
        console.error("Failed to fetch site content from DB:", error);
    }
    // Return static data as fallback if DB is empty or fails
    return fallbackContent;
}
