import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import { GalleryEvent } from "@/models/GalleryEvent";

export async function GET() {
  try {
    await connectMongo();
    const items = await GalleryEvent.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { imageUrl, publicId, title, description, time, venue } = body;

    if (!imageUrl || !publicId) {
      return NextResponse.json({ error: "Image Cloudinary data is required" }, { status: 400 });
    }

    await connectMongo();
    const newEvent = new GalleryEvent({
      imageUrl,
      publicId,
      title,
      description,
      time,
      venue
    });

    const savedEvent = await newEvent.save();
    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
