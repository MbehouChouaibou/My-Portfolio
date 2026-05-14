import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      [process.env.CONTACT_TO_EMAIL ?? "chouaiboumbehou@gmail.com"],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:    `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#6366f1">New message from ${name}</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <hr style="border-color:#334155"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
