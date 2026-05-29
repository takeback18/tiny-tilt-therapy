import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

interface Env {
  SEND_EMAIL: SendEmail;
}

const FROM = "noreply@tinytilttherapy.com";
const TO = "tinytilttherapy@gmail.com";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function sanitize(s: string) {
  return s.replace(/[<>]/g, "").trim().slice(0, 5000);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request" }, 400);
    }

    const firstName = typeof body.firstName === "string" ? sanitize(body.firstName) : "";
    const lastName  = typeof body.lastName  === "string" ? sanitize(body.lastName)  : "";
    const email     = typeof body.email     === "string" ? sanitize(body.email)     : "";
    const message   = typeof body.message   === "string" ? sanitize(body.message)   : "";

    if (!firstName || !lastName || !email || !message) {
      return json({ error: "All fields are required" }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email address" }, 400);
    }

    const msg = createMimeMessage();
    msg.setSender({ name: "Tiny Tilt Contact Form", addr: FROM });
    msg.setRecipient(TO);
    msg.setHeader("Reply-To", `${firstName} ${lastName} <${email}>`);
    msg.setSubject(`New Contact: ${firstName} ${lastName}`);

    msg.addMessage({
      contentType: "text/plain",
      data: [
        "New contact form submission from tinytilttherapy.com",
        "",
        `Name:    ${firstName} ${lastName}`,
        `Email:   ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    msg.addMessage({
      contentType: "text/html",
      data: `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#00667f">New Contact Form Submission</h2>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:8px 0;font-weight:bold;width:80px">Name</td><td>${firstName} ${lastName}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
  </table>
  <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0">
  <p style="font-weight:bold;margin-bottom:8px">Message</p>
  <p style="line-height:1.6;margin:0">${message.replace(/\n/g, "<br>")}</p>
  <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
  <p style="color:#888;font-size:12px">Sent via tinytilttherapy.com — hit Reply to respond directly to ${firstName}.</p>
</body>
</html>`,
    });

    const emailMessage = new EmailMessage(FROM, TO, msg.asRaw());

    try {
      await env.SEND_EMAIL.send(emailMessage);
    } catch (err) {
      console.error("Email send failed:", err);
      return json({ error: "Failed to send email. Please try again." }, 500);
    }

    return json({ ok: true });
  },
};
