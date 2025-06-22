import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailUser = process.env.EMAIL_USER;
const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

if (!emailUser || !emailAppPassword) {
  console.error('❌ Email configuration missing:');
  console.error('EMAIL_USER:', emailUser ? 'Set' : 'Not set');
  console.error('EMAIL_APP_PASSWORD:', emailAppPassword ? 'Set' : 'Not set');
  console.error('Please create a .env file in the server directory with:');
  console.error('EMAIL_USER=your-gmail@gmail.com');
  console.error('EMAIL_APP_PASSWORD=your-16-char-app-password');
}

// Create reusable transporter object using Gmail SMTP with proper SSL settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailUser,
    pass: emailAppPassword
  },
  tls: {
    rejectUnauthorized: false // This will handle self-signed certificate issues
  }
});

// Verify transporter configuration
transporter.verify(function(error: any, success: any) {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
    console.log('💡 Troubleshooting tips:');
    console.log('1. Check your Gmail App Password (should be 16 characters)');
    console.log('2. Make sure 2FA is enabled on your Gmail account');
    console.log('3. Verify the App Password was generated for "Mail"');
    console.log('4. Try regenerating the App Password if issues persist');
  } else {
    console.log('✅ Email transporter is ready to send messages');
  }
});

export async function sendVerificationEmail(
  toEmail: string,
  verificationLink: string
): Promise<void> {
  // Check if email configuration is available
  if (!emailUser || !emailAppPassword) {
    throw new Error('Email configuration not found. Please check your .env file.');
  }

  // Validate App Password length
  if (emailAppPassword.length !== 16) {
    console.warn('⚠️  Warning: EMAIL_APP_PASSWORD should be 16 characters, but is', emailAppPassword.length);
    console.warn('   This might cause authentication issues. Please regenerate your Gmail App Password.');
  }

  // Email options
  const mailOptions = {
    from: emailUser,
    to: toEmail,
    subject: 'Verify Your Email - Weather Reporter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Email Verification</h1>
        <p style="color: #666; font-size: 16px;">Please click the link below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">If you did not create an account, please ignore this email.</p>
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          This is an automated email from Weather Reporter
        </p>
      </div>
    `
  };

  // Send email
  try {
    console.log('📧 Attempting to send verification email to:', toEmail);
    console.log('📧 From:', emailUser);
    console.log('🔗 Verification link:', verificationLink);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully to:', toEmail);
    console.log('📧 Message ID:', result.messageId);
  } catch (error: any) {
    console.error('❌ Error sending verification email:', error);
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check your EMAIL_USER and EMAIL_APP_PASSWORD in .env file.');
    } else if (error.code === 'ECONNECTION') {
      throw new Error('Email connection failed. Please check your internet connection and Gmail settings.');
    } else if (error.code === 'ESOCKET') {
      throw new Error('Email socket error. This might be due to network issues or Gmail security settings.');
    } else {
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
  }
} 