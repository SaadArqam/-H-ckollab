# Email Notification Setup

## Gmail Configuration

To enable email notifications for invites, you need to configure Gmail SMTP:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication if not already enabled

### 2. Generate App Password
- Go to Google Account → Security → 2-Step Verification
- Click "App passwords" (at the bottom)
- Select "Mail" and "Other (Custom name)"
- Name it "Hackollab Backend"
- Copy the generated 16-character password

### 3. Add Environment Variables
Add these to your `.env` file:

```env
# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-character-app-password"
FRONTEND_URL="http://localhost:3000"
```

### 4. Test Email Setup
The email service will automatically send notifications when:
- ✅ Someone sends an invite
- ✅ Someone accepts/declines an invite

### Email Templates
- **Invite Email**: Sent to the person being invited
- **Response Email**: Sent to the person who sent the invite

### Troubleshooting
If emails aren't sending:
1. Check that `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly
2. Verify the app password is correct (16 characters)
3. Check backend logs for email errors
4. Make sure Gmail allows "less secure app access" or use app passwords

### Security Notes
- Never commit your `.env` file to version control
- Use app passwords, not your regular Gmail password
- Consider using a dedicated email account for your app 