const verifyEmailBody = (username, verifyLink) => `
  <p style="font-size:16px; margin:0 0 16px;">
    Hi <strong>${username}</strong>,
  </p>

  <p style="font-size:15px; line-height:1.6; margin:0 0 24px; color:#374151;">
    Thank you for creating an account. Please verify your email address by clicking the button below.
  </p>

  <table cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <a href="${verifyLink}" style="
          background:#111827;
          color:#ffffff;
          text-decoration:none;
          padding:12px 24px;
          border-radius:4px;
          font-size:15px;
          font-weight:600;
          display:inline-block;
        ">
          Verify Email
        </a>
      </td>
    </tr>
  </table>

  <p style="font-size:14px; color:#6b7280; margin:24px 0 8px;">
    Or copy and paste this link into your browser:
  </p>

  <p style="font-size:13px; color:#2563eb; word-break:break-all; margin:0;">
    ${verifyLink}
  </p>

  <p style="font-size:14px; color:#6b7280; line-height:1.6; margin-top:32px;">
    If you did not sign up for this account, you can safely ignore this email.
  </p>
`;

