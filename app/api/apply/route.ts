import { NextRequest, NextResponse } from 'next/server';
import { createTransporter, getApplicationEmailTemplate } from '@/lib/email/config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobId = formData.get('jobId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const message = formData.get('message') as string;
    const cvFile = formData.get('cv') as File;

    // Validate required fields
    if (!name || !email || !phone || !jobId || !jobTitle || !cvFile) {
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

    // Convert file to buffer for email attachment
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    // Create transporter and send email
    const transporter = createTransporter();
    const mailOptions = getApplicationEmailTemplate({
      name,
      email,
      phone,
      jobId,
      jobTitle,
      message,
      cvFileName: cvFile.name,
      cvBuffer,
      cvMimeType: cvFile.type,
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
