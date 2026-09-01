import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.MY_EMAIL as string,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || "New Message from " + name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}