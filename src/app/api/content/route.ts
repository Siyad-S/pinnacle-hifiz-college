import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { SiteContentModel } from '@/models/SiteContent';
import { getSiteContent } from '@/lib/getContent';

export async function GET() {
    const content = await getSiteContent();
    return NextResponse.json(content);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        
        // Clean out any Mongoose internals that might have been passed
        delete body._id;
        delete body.__v;
        delete body.createdAt;
        delete body.updatedAt;

        await connectMongo();
        
        const existing = await SiteContentModel.findOne();
        if (existing) {
            await SiteContentModel.replaceOne({}, body);
        } else {
            await SiteContentModel.create(body);
        }

        const updatedContent = await getSiteContent();
        return NextResponse.json(updatedContent);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to save content' }, { status: 500 });
    }
}
