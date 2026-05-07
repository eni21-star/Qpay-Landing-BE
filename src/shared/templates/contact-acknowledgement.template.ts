const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

interface ContactAcknowledgementTemplateInput {
  email: string;
  question: string;
}

export const buildContactAcknowledgementTemplate = ({
  email,
  question,
}: ContactAcknowledgementTemplateInput) => {
  const safeEmail = escapeHtml(email);
  const safeQuestion = escapeHtml(question);

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
        <body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue',Arial,sans-serif;color:#1d1d1f;">
          <div style="padding:40px 16px;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:28px;padding:0;box-shadow:0 20px 60px rgba(0,0,0,0.06);overflow:hidden;border:1px solid rgba(17,17,17,0.04);">
              <div style="height:4px;background:linear-gradient(90deg,#ff5a1f 0%,#ff6a36 55%,#ffd7c7 100%);"></div>
              <div style="padding:40px 40px 18px;">
                <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:26px;">
                  <div style="width:46px;height:46px;border-radius:14px;background:#ff5a1f;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(255,90,31,0.20);overflow:hidden;">
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M19 10C14.0294 10 10 14.0294 10 19V45C10 49.9706 14.0294 54 19 54H44L32.8 42.8H25C20.5817 42.8 17 39.2183 17 34.8V29.2C17 24.7817 20.5817 21.2 25 21.2H39C43.4183 21.2 47 24.7817 47 29.2V38C47 41.866 50.134 45 54 45V19C54 14.0294 49.9706 10 45 10H19Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#8a8a90;margin-bottom:4px;">
                      Qpay NG
                    </div>
                    <div style="font-size:14px;color:#6e6e73;line-height:1.4;">
                      Question confirmation
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding:0 40px 42px;">
                <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,90,31,0.08);color:#c2410c;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">
                  Message received
                </div>
                <h1 style="margin:0 0 16px;font-size:36px;line-height:1.08;font-weight:600;color:#1d1d1f;letter-spacing:-0.03em;">
                  We received your question.
                </h1>
                <p style="margin:0 0 14px;font-size:17px;line-height:1.65;color:#424245;">
                  Thanks for reaching out to us. Our team has your message and will get back to you as soon as possible.
                </p>
                <p style="margin:0 0 32px;font-size:17px;line-height:1.65;color:#424245;">
                  For reference, here is the question we received from <span style="color:#1d1d1f;font-weight:600;">${safeEmail}</span>.
                </p>
                <div style="border:1px solid #e5e5e7;border-radius:22px;padding:24px;background:linear-gradient(180deg,#ffffff 0%,#fbfbfd 100%);">
                  <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#86868b;margin-bottom:12px;">
                    Your question
                  </div>
                  <div style="font-size:16px;line-height:1.7;color:#1d1d1f;white-space:pre-wrap;">
                    ${safeQuestion}
                  </div>
                </div>
                <div style="margin-top:18px;padding-top:18px;border-top:1px solid #f0f0f2;font-size:14px;line-height:1.7;color:#6e6e73;">
                  This is an automated confirmation from Qpay NG.
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `.trim(),
  };
};
