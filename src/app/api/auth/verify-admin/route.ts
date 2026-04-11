import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectMongo from '@/lib/mongoose';
import { User } from '@/models/User';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectMongo();

        // Check if user exists in Database
        const dbUser = await User.findOne({ email: session.user.email });

        if (!dbUser) {
            return new NextResponse('User not found', { status: 404 });
        }

        // Verify if user is an ADMIN
        if (dbUser.role !== 'ADMIN') {
            return new NextResponse('Forbidden', { status: 403 });
        }

        // Verification successful
        return new NextResponse('OK', { status: 200 });
    } catch (error) {
        console.error('[VERIFY_ADMIN] Server Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
