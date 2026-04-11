import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import { User } from "@/models/User";

/**
 * Emergency admin reset endpoint.
 *
 * Call this ONLY if you lose access to the admin Google account.
 * After calling this, the very next Google sign-in will become the new admin.
 *
 * Usage:
 *   POST /api/admin/reset
 *   Header: x-reset-token: <ADMIN_RESET_TOKEN from .env>
 *
 * This route is a dead-end for anyone without the secret reset token.
 */
export async function POST(req: NextRequest) {
  const resetToken = process.env.ADMIN_RESET_TOKEN;

  // If no token is configured, disable this endpoint entirely
  if (!resetToken) {
    return NextResponse.json(
      { error: "Reset endpoint is not configured." },
      { status: 403 }
    );
  }

  // Verify the secret token from the request header
  const providedToken = req.headers.get("x-reset-token");
  if (providedToken !== resetToken) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  await connectMongo();

  // Delete all users — the next sign-in will automatically become ADMIN
  const result = await User.deleteMany({});

  return NextResponse.json({
    success: true,
    message: `Admin reset complete. ${result.deletedCount} user(s) removed. The next Google sign-in will become the new admin.`,
  });
}
