import nodemailer from 'nodemailer';

// Create reusable transporter
export const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Email templates
export const getContactEmailTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  return {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to yourself
    replyTo: data.email,
    subject: `Contact Form: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #ff006e 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00f0ff; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${data.name} (${data.email})</div>
              </div>
              ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="footer">
                Sent from Cubiclabs Contact Form<br>
                You can reply directly to this email to respond to ${data.name}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Contact Form Submission

From: ${data.name} (${data.email})
${data.phone ? `Phone: ${data.phone}\n` : ''}Subject: ${data.subject}

Message:
${data.message}

---
Sent from Cubiclabs Contact Form
    `,
  };
};

export const getApplicationEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  message?: string;
  cvFileName?: string;
  cvBuffer?: Buffer;
  cvMimeType?: string;
}) => {
  return {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to yourself
    replyTo: data.email,
    subject: `Job Application: ${data.jobTitle} - ${data.name}`,
    attachments: data.cvBuffer ? [
      {
        filename: data.cvFileName || 'resume.pdf',
        content: data.cvBuffer,
        contentType: data.cvMimeType || 'application/pdf',
      },
    ] : [],
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #ff006e 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #ff006e; }
            .job-info { background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 0, 110, 0.1) 100%); padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Job Application</h2>
            </div>
            <div class="content">
              <div class="job-info">
                <strong>Position:</strong> ${data.jobTitle}<br>
                <strong>Job ID:</strong> ${data.jobId}
              </div>

              <div class="field">
                <div class="label">Applicant Name:</div>
                <div class="value">${data.name}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>

              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>

              ${data.cvFileName ? `
              <div class="field">
                <div class="label">CV/Resume:</div>
                <div class="value">📎 ${data.cvFileName} (attached)</div>
              </div>
              ` : ''}

              ${data.message ? `
              <div class="field">
                <div class="label">Cover Letter / Additional Info:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}

              <div class="footer">
                Sent from Cubiclabs Careers Portal<br>
                You can reply directly to this email to contact ${data.name}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Job Application

Position: ${data.jobTitle}
Job ID: ${data.jobId}

Applicant Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

${data.cvFileName ? `CV/Resume: ${data.cvFileName} (attached)\n` : ''}
${data.message ? `\nCover Letter:\n${data.message}\n` : ''}

---
Sent from Cubiclabs Careers Portal
    `,
  };
};
