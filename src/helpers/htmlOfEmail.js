export const html = (username, otp) => {
    return (`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        </head>
      <body>
        <div class="email-container">
          <div class="email-body">
            <p>Dear ${username},</p>
            <p>Thank you for registering with us! Please fill the given below to verify your email address:</p>
            <h1>${otp}</h1>  <p>If you did not create an account, no further action is required.</p>
            <p>Best regards,<br>Arjun Nagar </p>
          </div>
          <div class="email-footer">
            </div>
        </div>
      </body>
      </html>
    `);
  };
  