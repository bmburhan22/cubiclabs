import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials from https://www.emailjs.com/
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  CONTACT_TEMPLATE_ID: 'YOUR_CONTACT_TEMPLATE_ID', // Replace with your contact form template ID
  APPLICATION_TEMPLATE_ID: 'YOUR_APPLICATION_TEMPLATE_ID', // Replace with your job application template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send contact form email
export const sendContactEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Cubiclabs Team',
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};

// Send job application email
export const sendApplicationEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  jobId: string;
  jobTitle: string;
  cvUrl?: string;
  message?: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.APPLICATION_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        address: data.address,
        job_id: data.jobId,
        job_title: data.jobTitle,
        cv_url: data.cvUrl || 'Not provided',
        message: data.message || 'No additional message',
        to_name: 'Cubiclabs HR Team',
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};
