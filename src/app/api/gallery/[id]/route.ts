import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import { GalleryEvent } from "@/models/GalleryEvent";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUT /api/gallery/[id] — update metadata
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectMongo();
    const body = await req.json();
    const { title, description, time, venue, imageUrl, publicId } = body;

    const updateFields: any = { title, description, time, venue };
    if (imageUrl) updateFields.imageUrl = imageUrl;
    if (publicId) updateFields.publicId = publicId;

    const updated = await GalleryEvent.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/gallery/[id] — delete from DB + Cloudinary
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectMongo();
    const item = await GalleryEvent.findById(id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(item.publicId);

    // Delete from DB
    await GalleryEvent.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
