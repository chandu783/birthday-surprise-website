import { NextResponse } from "next/server";
import { config } from "@/config";


const MAX_WISH_LENGTH = 1000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { wishes?: unknown[] };
    const wishes = Array.isArray(body.wishes)
      ? body.wishes
          .filter((wish): wish is string => typeof wish === "string")
          .map((wish) => wish.trim().slice(0, MAX_WISH_LENGTH))
      : [];

    if (wishes.length !== config.wishes.maxWishes || wishes.some((wish) => !wish)) {
      return NextResponse.json({ error: "Please complete all wishes." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email delivery is not configured yet." }, { status: 503 });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Birthday Wishes <onboarding@resend.dev>",
        to: [config.wishes.notificationEmail],
        subject: "New birthday wishes received",
        text: wishes.map((wish, index) => `Wish ${index + 1}:\n${wish}`).join("\n\n"),
        html: `<h2>New birthday wishes</h2>${wishes
          .map((wish, index) => `<p><strong>Wish ${index + 1}</strong><br />${escapeHtml(wish).replace(/\n/g, "<br />")}</p>`)
          .join("")}`,
      }),
    });

    if (!emailResponse.ok) {
  const errorText = await emailResponse.text();

  console.error("Resend API error:", emailResponse.status, errorText);

  return NextResponse.json(
    {
      error: "We could not send the wishes right now.",
      details: errorText,
    },
    { status: 502 }
  );
}

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}
