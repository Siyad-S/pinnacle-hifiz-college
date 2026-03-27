import { NextResponse } from 'next/server';
import { siteContent as defaultContent } from '@/data/siteContent';

export async function GET() {
    return NextResponse.json(defaultContent);
}

export async function PUT(request: Request) {
    return NextResponse.json({ error: 'Editing is disabled in static mode.' }, { status: 405 });
}
