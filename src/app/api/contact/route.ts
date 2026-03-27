import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z, ZodError } from 'zod';

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body = await req.json();
        const { name, email, phone, message } = formSchema.parse(body);

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.CONTACT_EMAIL as string,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0d9488;">New Message from Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
    } catch (error) {
        console.error('Email send error:', error);
        if (error instanceof ZodError) {
            return NextResponse.json({ error: 'Invalid form data', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
