import nodemailer from 'nodemailer';

// Konfigurasi email transporter
const createTransporter = () => {
  // Untuk development, gunakan ethereal email (fake SMTP)
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });
  }

  // Untuk production, gunakan Gmail SMTP atau service email lainnya
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'KinderCare <noreply@kindercare.com>',
      to: email,
      subject: 'Reset Password - KinderCare',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password - KinderCare</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #F857A6 0%, #FF5858 100%); border-radius: 10px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">KinderCare</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Platform Edukasi Seksual Anak</p>
            </div>
            
            <div style="background: white; border-radius: 10px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Reset Password</h2>
              
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Halo!
              </p>
              
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Anda telah meminta reset password untuk akun KinderCare Anda. 
                Klik tombol di bawah ini untuk membuat password baru:
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #F857A6 0%, #FF5858 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(248, 87, 166, 0.3);">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Link ini akan kedaluwarsa dalam <strong>15 menit</strong> untuk keamanan akun Anda.
              </p>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                Email ini dikirim otomatis, mohon jangan membalas.
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 10px 0 0 0;">
                © 2025 KinderCare. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Fungsi untuk verifikasi konfigurasi email
export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};
