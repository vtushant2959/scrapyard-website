import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadAlert(data: {
  name: string;
  phone: string;
  email: string;
  city?: string;
  businessType?: string;
  scrapType?: string;
  message?: string;
}) {
  const to = process.env.CONTACT_TO ?? "info@scrapyard.co.in";

  await transporter.sendMail({
    from: `"SCRAPYARD Website" <${process.env.SMTP_USER}>`,
    to,
    subject: `🔔 New Pickup Request — ${data.name} (${data.city || "Unknown City"})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:12px;">
        <div style="background:#081018;padding:24px;border-radius:10px;text-align:center;margin-bottom:20px;">
          <h1 style="color:#2CEB88;margin:0;font-size:24px;">🏭 SCRAPYARD</h1>
          <p style="color:#aaa;margin:6px 0 0;">New Lead Alert</p>
        </div>

        <div style="background:#fff;padding:24px;border-radius:10px;margin-bottom:16px;">
          <h2 style="color:#081018;margin:0 0 16px;font-size:18px;">📋 Lead Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;width:140px;">Name</td>
              <td style="padding:10px 0;color:#111;font-size:14px;font-weight:bold;">${data.name}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Phone</td>
              <td style="padding:10px 0;color:#111;font-size:14px;font-weight:bold;">
                <a href="tel:${data.phone}" style="color:#2CEB88;text-decoration:none;">${data.phone}</a>
              </td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Email</td>
              <td style="padding:10px 0;font-size:14px;">
                <a href="mailto:${data.email}" style="color:#2CEB88;text-decoration:none;">${data.email}</a>
              </td>
            </tr>
            ${data.city ? `<tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">City</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.city}</td>
            </tr>` : ""}
            ${data.businessType ? `<tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Business Type</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.businessType}</td>
            </tr>` : ""}
            ${data.scrapType ? `<tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Scrap Type</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.scrapType}</td>
            </tr>` : ""}
            ${data.message ? `<tr>
              <td style="padding:10px 0;color:#666;font-size:14px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.message}</td>
            </tr>` : ""}
          </table>
        </div>

        <div style="background:#2CEB88;padding:16px 24px;border-radius:10px;text-align:center;margin-bottom:16px;">
          <a href="https://scrapyard.co.in/admin" style="color:#081018;font-weight:bold;font-size:15px;text-decoration:none;">
            👉 View in Admin Panel → scrapyard.co.in/admin
          </a>
        </div>

        <div style="text-align:center;padding:12px;">
          <a href="tel:${data.phone}" style="display:inline-block;background:#081018;color:#2CEB88;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;margin:0 6px;">
            📞 Call Now
          </a>
          <a href="https://wa.me/${data.phone.replace(/\D/g, "")}?text=Hi ${encodeURIComponent(data.name)}! This is SCRAPYARD. We received your pickup request and will be in touch shortly." style="display:inline-block;background:#25D366;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;margin:0 6px;">
            💬 WhatsApp
          </a>
        </div>

        <p style="text-align:center;color:#aaa;font-size:12px;margin-top:16px;">
          SCRAPYARD · info@scrapyard.co.in · +91 8505863220
        </p>
      </div>
    `,
  });
}

export async function sendWaitlistAlert(data: {
  name: string;
  phone: string;
  email: string;
  city?: string;
  userType?: string;
}) {
  const to = process.env.CONTACT_TO ?? "info@scrapyard.co.in";

  await transporter.sendMail({
    from: `"SCRAPYARD Website" <${process.env.SMTP_USER}>`,
    to,
    subject: `📱 New App Waitlist Signup — ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:12px;">
        <div style="background:#081018;padding:24px;border-radius:10px;text-align:center;margin-bottom:20px;">
          <h1 style="color:#2CEB88;margin:0;font-size:24px;">🏭 SCRAPYARD</h1>
          <p style="color:#aaa;margin:6px 0 0;">New App Waitlist Signup</p>
        </div>

        <div style="background:#fff;padding:24px;border-radius:10px;margin-bottom:16px;">
          <h2 style="color:#081018;margin:0 0 16px;font-size:18px;">📱 Waitlist Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;width:140px;">Name</td>
              <td style="padding:10px 0;color:#111;font-size:14px;font-weight:bold;">${data.name}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Phone</td>
              <td style="padding:10px 0;color:#2CEB88;font-size:14px;font-weight:bold;">${data.phone}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">Email</td>
              <td style="padding:10px 0;font-size:14px;">${data.email}</td>
            </tr>
            ${data.city ? `<tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#666;font-size:14px;">City</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.city}</td>
            </tr>` : ""}
            ${data.userType ? `<tr>
              <td style="padding:10px 0;color:#666;font-size:14px;">User Type</td>
              <td style="padding:10px 0;color:#111;font-size:14px;">${data.userType}</td>
            </tr>` : ""}
          </table>
        </div>

        <div style="background:#2CEB88;padding:16px 24px;border-radius:10px;text-align:center;">
          <a href="https://scrapyard.co.in/admin" style="color:#081018;font-weight:bold;font-size:15px;text-decoration:none;">
            👉 View All Waitlist → Admin Panel
          </a>
        </div>

        <p style="text-align:center;color:#aaa;font-size:12px;margin-top:16px;">
          SCRAPYARD · info@scrapyard.co.in · +91 8505863220
        </p>
      </div>
    `,
  });
}
