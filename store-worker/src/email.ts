import type { Env } from "./types";

const FROM = "Tiny Tilt Therapy <noreply@tinytilttherapy.com>";

export interface DeliveryFile {
  label: string;
  url: string;
}

export interface DeliveryItem {
  productName: string;
  files: DeliveryFile[];
}

interface Attachment {
  path: string;
  filename: string;
}

async function sendEmail(
  env: Env,
  to: string,
  subject: string,
  html: string,
  text: string,
  attachments: Attachment[] = [],
): Promise<void> {
  const payload: Record<string, unknown> = { from: FROM, to, subject, html, text };
  if (attachments.length > 0) payload.attachments = attachments;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend send failed:", res.status, body);
    throw new Error("Failed to send email");
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeFilename(label: string): string {
  return (label.replace(/[^a-z0-9 _-]/gi, "").trim() || "download") + ".pdf";
}

function wrap(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#00667f">${title}</h2>
  ${bodyHtml}
  <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
  <p style="color:#888;font-size:12px">Sent via tinytilttherapy.com.</p>
</body>
</html>`;
}

// Sends the buyer their files: attached to the email, plus download links as a
// fallback in case their mail provider strips or blocks the attachments.
// `attach` is false in local dev, where Resend can't reach localhost URLs.
export async function sendDeliveryEmail(
  env: Env,
  to: string,
  items: DeliveryItem[],
  opts: { isResend: boolean; attach: boolean },
): Promise<void> {
  const intro = opts.isResend
    ? "Here are your Tiny Tilt Therapy downloads."
    : "Thank you for your purchase! Your files are attached to this email.";
  const attachNote = opts.attach
    ? "The files are attached. You can also download them anytime with the links below."
    : "Download your files with the links below.";

  const itemsHtml = items
    .map(
      (item) => `
      <p style="margin:20px 0 8px;font-weight:bold">${escapeHtml(item.productName)}</p>
      ${item.files
        .map(
          (f) =>
            `<p style="margin:6px 0"><a href="${f.url}" style="display:inline-block;background:#00667f;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none">Download ${escapeHtml(f.label)}</a></p>`,
        )
        .join("")}`,
    )
    .join("");

  const html = wrap(
    opts.isResend ? "Your downloads" : "Thanks for your purchase!",
    `<p style="line-height:1.6">${intro} ${attachNote}</p>
     ${itemsHtml}
     <p style="color:#888;font-size:13px;margin-top:24px;line-height:1.6">These links don't expire. Lost this email? You can have it resent anytime at ${env.SITE_URL}/downloads.</p>
     <p style="color:#888;font-size:13px;line-height:1.6">Replies to this email aren't monitored. Questions? Reach us through the contact form at ${env.SITE_URL}/#contact.</p>`,
  );

  const text = [
    intro,
    attachNote,
    "",
    ...items.flatMap((item) => [item.productName, ...item.files.map((f) => `${f.label}: ${f.url}`), ""]),
    `These links don't expire. Lost this email? Have it resent at ${env.SITE_URL}/downloads`,
    "",
    `Replies to this email aren't monitored. Questions? Use the contact form at ${env.SITE_URL}/#contact`,
  ].join("\n");

  const attachments = opts.attach
    ? items.flatMap((item) => item.files.map((f) => ({ path: f.url, filename: safeFilename(f.label) })))
    : [];

  const subject = opts.isResend ? "Your Tiny Tilt Therapy downloads" : "Your Tiny Tilt Therapy purchase";
  await sendEmail(env, to, subject, html, text, attachments);
}
