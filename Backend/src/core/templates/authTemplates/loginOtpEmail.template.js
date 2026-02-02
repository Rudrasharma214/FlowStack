const loginOtpBody = (username, otp) => `
  <p style="font-size:16px; margin:0 0 16px;">
    Hi <strong>${username}</strong>,
  </p>

  <p style="font-size:15px; line-height:1.6; margin:0 0 24px; color:#374151;">
    Use the one-time password below to securely log in to your account.
  </p>

  <!-- OTP Box -->
  <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr>
      <td style="
        background:#f9fafb;
        border:1px solid #e5e7eb;
        padding:14px 24px;
        font-size:20px;
        font-weight:700;
        letter-spacing:4px;
        color:#111827;
        border-radius:4px;
        text-align:center;
      ">
        ${otp}
      </td>
    </tr>
  </table>

  <p style="font-size:14px; color:#6b7280; margin:0;">
    This OTP is valid for a limited time. Do not share it with anyone.
  </p>

  <p style="font-size:14px; color:#6b7280; line-height:1.6; margin-top:24px;">
    If you did not attempt to log in, please secure your account immediately.
  </p>
`;
