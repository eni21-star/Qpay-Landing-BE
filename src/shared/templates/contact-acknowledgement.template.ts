const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatQuestionHtml = (value: string): string =>
  escapeHtml(value).replace(/\r?\n/g, '<br />');

interface ContactAcknowledgementTemplateInput {
  email: string;
  question: string;
}

export const buildContactAcknowledgementTemplate = ({
  email,
  question,
}: ContactAcknowledgementTemplateInput) => {
  const safeEmail = escapeHtml(email);
  const safeQuestion = formatQuestionHtml(question);

  return {
    subject: 'We received your question',
    text: [
      'We received your question and will get back to you soon.',
      '',
      `Email: ${email}`,
      `Question: ${question}`,
      '',
      'Qpay NG',
    ].join('\n'),
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>We received your question</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue',Arial,sans-serif;color:#1d1d1f;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background-color:#f5f5f7;">
            <tr>
              <td align="center" style="padding:40px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;border-collapse:separate;background-color:#ffffff;border:1px solid #e9e9ec;border-radius:28px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.06);">
                  <tr>
                    <td style="height:4px;line-height:4px;font-size:0;background-color:#ff5a1f;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px 0 40px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="56" valign="middle" style="width:56px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="56" height="56" align="center" valign="middle" style="width:56px;height:56px;background-color:#ff5a1f;border-radius:18px;box-shadow:0 10px 24px rgba(255,90,31,0.18);">
                                  <img src="cid:qpay-logo" alt="Qpay NG" width="30" height="30" style="display:block;width:30px;height:30px;border:0;outline:none;text-decoration:none;" />
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" style="padding-left:18px;">
                            <div style="font-size:13px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;color:#8a8a90;font-weight:500;">
                              Qpay NG
                            </div>
                            <div style="font-size:15px;line-height:22px;color:#6e6e73;padding-top:6px;">
                              Question confirmation
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 40px 42px 40px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 20px 0;">
                            <span style="display:inline-block;padding:8px 14px;border-radius:999px;background-color:#fff2eb;color:#c2410c;font-size:12px;line-height:16px;letter-spacing:0.08em;text-transform:uppercase;">
                              Message received
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px 0;font-size:36px;line-height:40px;letter-spacing:-0.03em;font-weight:600;color:#1d1d1f;">
                            We received your question.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 14px 0;font-size:17px;line-height:30px;color:#424245;">
                            Thanks for reaching out to us. Our team has your message and will get back to you as soon as possible.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 28px 0;font-size:17px;line-height:30px;color:#424245;">
                            For reference, here is the question we received from
                            <span style="color:#1d1d1f;font-weight:600;"> ${safeEmail}</span>.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 18px 0;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;background-color:#f7f7f8;border:1px solid #e5e5e7;border-radius:22px;">
                              <tr>
                                <td style="padding:24px 24px 10px 24px;font-size:12px;line-height:16px;letter-spacing:0.12em;text-transform:uppercase;color:#86868b;">
                                  Your question
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:0 24px 24px 24px;font-size:16px;line-height:28px;color:#1d1d1f;font-weight:400;word-break:break-word;">
                                  ${safeQuestion}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="border-top:1px solid #f0f0f2;padding-top:18px;font-size:14px;line-height:24px;color:#6e6e73;">
                            This is an automated confirmation from Qpay NG.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `.trim(),
  };
};
