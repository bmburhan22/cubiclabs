import { NextRequest, NextResponse } from 'next/server';
import { createTransporter, getApplicationEmailTemplate } from '@/lib/email/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, jobId, jobTitle, message, cvFileName } = body;

    // Validate required fields
    if (!name || !email || !phone || !address || !jobId || !jobTitle) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Create transporter and send email
    const transporter = createTransporter();
    const mailOptions = getApplicationEmailTemplate({
      name,
      email,
      phone,
      address,
      jobId,
      jobTitle,
      message,
      cvFileName,
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Application sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: 'Failed to send application. Please try again later.' },
      { status: 500 }
    );
  }
}
