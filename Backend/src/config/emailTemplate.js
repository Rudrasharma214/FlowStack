const emailLayout = (bodyContent) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0; padding:0; background-color:#ffffff; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding:24px 32px; border-bottom:1px solid #e5e7eb;">
              <h1 style="margin:0; font-size:22px; font-weight:600; color:#111827;">
                Your Company Name
              </h1>
            </td>
          </tr>

          <!-- Body (Injected) -->
          <tr>
            <td style="padding:32px; color:#111827;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px; text-align:center; border-top:1px solid #e5e7eb; background:#ffffff;">

              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:12px;">
                <tr>
                  <td style="padding:0 6px;">
                    <a href="https://www.linkedin.com/company/yourcompany" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                           alt="LinkedIn"
                           width="20"
                           height="20"
                           style="display:block; border:0;" />
                    </a>
                  </td>
                  <td style="padding:0 6px;">
                    <a href="https://www.instagram.com/yourcompany" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                           alt="Instagram"
                           width="20"
                           height="20"
                           style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} Your Company Name
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};