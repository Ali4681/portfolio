const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; message?: string };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    if (!name || name.length > 100 || !email || !emailPattern.test(email) || !message || message.length < 10 || message.length > 5000) return Response.json({ error: "Invalid form data" }, { status: 400 });
    // Delivery adapter: connect Resend here by setting an API key and recipient in production.
    // The validated endpoint intentionally avoids claiming delivery before credentials exist.
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) return Response.json({ error: "Email delivery is not configured" }, { status: 503 });
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: "Portfolio <onboarding@resend.dev>", to: process.env.CONTACT_EMAIL, reply_to: email, subject: `Portfolio message from ${name}`, text: message }) });
    if (!response.ok) return Response.json({ error: "Delivery failed" }, { status: 502 });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
}
