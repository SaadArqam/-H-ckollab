import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
    },
  });
};

// Send invite email
export const sendInviteEmail = async (receiverEmail, receiverName, senderName, projectTitle, role) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: `🎉 You've been invited to collaborate on "${projectTitle}"!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🎉 Project Invitation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You've been invited to collaborate!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${receiverName},</h2>
            
            <p style="color: #555; line-height: 1.6;">
              <strong>${senderName}</strong> has invited you to collaborate on their project:
            </p>
            
            <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #333; margin: 0 0 10px 0;">${projectTitle}</h3>
              <p style="color: #666; margin: 0;"><strong>Role:</strong> ${role}</p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              This is an exciting opportunity to work together on an innovative project. 
              You can view and respond to this invitation in your dashboard.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/my-invites" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View Invitation
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px; margin-top: 30px;">
              If you have any questions, feel free to reach out to ${senderName}.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This email was sent from Hackollab - Your Collaborative Development Platform</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

// Send invite response email
export const sendInviteResponseEmail = async (senderEmail, senderName, receiverName, projectTitle, response) => {
  try {
    const transporter = createTransporter();
    
    const responseText = response === 'accepted' ? 'accepted' : 'declined';
    const responseEmoji = response === 'accepted' ? '🎉' : '😔';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: senderEmail,
      subject: `${responseEmoji} ${receiverName} has ${responseText} your invitation`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, ${response === 'accepted' ? '#28a745' : '#dc3545'} 0%, ${response === 'accepted' ? '#20c997' : '#e74c3c'} 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${responseEmoji} Invitation ${response === 'accepted' ? 'Accepted' : 'Declined'}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${receiverName} has responded to your invitation</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${senderName},</h2>
            
            <p style="color: #555; line-height: 1.6;">
              <strong>${receiverName}</strong> has ${responseText} your invitation to collaborate on:
            </p>
            
            <div style="background: white; border-left: 4px solid ${response === 'accepted' ? '#28a745' : '#dc3545'}; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #333; margin: 0 0 10px 0;">${projectTitle}</h3>
            </div>
            
            ${response === 'accepted' ? 
              `<p style="color: #555; line-height: 1.6;">
                Great news! ${receiverName} is excited to join your project. You can now collaborate together on this exciting venture.
              </p>` : 
              `<p style="color: #555; line-height: 1.6;">
                ${receiverName} has declined the invitation. Don't worry, you can always invite other developers to your project.
              </p>`
            }
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/my-projects" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View Project
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This email was sent from Hackollab - Your Collaborative Development Platform</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Response email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending response email:', error);
    return false;
  }
}; 