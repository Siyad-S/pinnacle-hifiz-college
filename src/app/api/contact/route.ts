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
            // Don't fail the whole request just yet, we might still want to try saving to Google Sheets.
        }

        // ---------- Google Sheets (Apps Script) Integration ----------
        if (process.env.GOOGLE_APP_SCRIPT_URL) {
            try {
                console.log("script started!");

                const response = await fetch(process.env.GOOGLE_APP_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message }),
                });

                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    console.log("script finished with JSON:", data);
                } catch (e) {
                    console.log("script finished with HTML/Text response. Make sure your Google Apps Script is deployed with 'Who has access' set to 'Anyone', and ends with /exec. Response preview:", text.substring(0, 100));
                }

            } catch (err) {
                console.error('Google App Script Webhook error:', err);
                // We won't block the response to the user if the spreadsheet logging fails
            }
        }

        if (error) {
            return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Message sent successfully', data }, { status: 200 });
    } catch (error) {
        console.error('Email send error:', error);
        if (error instanceof ZodError) {
            return NextResponse.json({ error: 'Invalid form data', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
