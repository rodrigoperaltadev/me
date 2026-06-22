"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "MISSING_FIELDS — All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "INVALID_EMAIL — Check the email format." };
  }

  try {
    await resend.emails.send({
      from: "Rodrigo Peralta <contact@rodrigoperalta.ar>",
      to: "rodrigoperalta.dev@gmail.com",
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #111111; color: #E5E4E2;">
          <div style="border-left: 3px solid #00FFFF; padding-left: 16px; margin-bottom: 24px;">
            <p style="color: #00FFFF; font-size: 11px; letter-spacing: 0.1em; margin: 0 0 4px;">// NEW_MESSAGE_RECEIVED</p>
            <h1 style="font-size: 24px; margin: 0; color: #E5E4E2;">Portfolio Contact</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #00FFFF; font-size: 11px; letter-spacing: 0.1em; width: 80px;">FROM</td>
              <td style="padding: 8px 0; color: #E5E4E2;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #00FFFF; font-size: 11px; letter-spacing: 0.1em;">EMAIL</td>
              <td style="padding: 8px 0; color: #E5E4E2;"><a href="mailto:${email}" style="color: #00FFFF;">${email}</a></td>
            </tr>
          </table>
          <div style="border-top: 1px solid rgba(229,228,226,0.1); padding-top: 24px;">
            <p style="color: #00FFFF; font-size: 11px; letter-spacing: 0.1em; margin: 0 0 12px;">MESSAGE</p>
            <p style="color: #E5E4E2; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return { status: "success", message: "MESSAGE_SENT — I'll get back to you shortly." };
  } catch {
    return { status: "error", message: "TRANSMISSION_FAILED — Please try again or email me directly." };
  }
}
