import { profile } from "../../data/profile";
import { AccountApi, Configuration, SendApi, type V1SendRequest } from "hostinger-mail-api-sdk";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; message?: string };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    if (!name || name.length > 100 || !email || !emailPattern.test(email) || !message || message.length < 10 || message.length > 5000) return Response.json({ error: "Invalid form data" }, { status: 400 });
    if (!process.env.HOSTINGER_MAIL_API_TOKEN) return Response.json({ error: "Email delivery is not configured" }, { status: 503 });
    try {
      const configuration = new Configuration({
        accessToken: process.env.HOSTINGER_MAIL_API_TOKEN,
        baseOptions: { timeout: 15000 },
      });
      const account = await new AccountApi(configuration).getCurrentAccount();
      const mailbox = account.data.data.mailboxes.find(
        (mailbox) => mailbox.address.toLowerCase() === profile.email.toLowerCase(),
      );
      if (!mailbox) return Response.json({ error: "Email delivery is not configured" }, { status: 503 });
      // SDK 1.19.7 marks optional API fields as required, including mutually exclusive threading fields.
      const payload = {
        to: [profile.email],
        displayName: "Portfolio Contact",
        subject: `Portfolio message from ${name.replace(/[\r\n]/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      } satisfies Partial<V1SendRequest>;
      await new SendApi(configuration).sendEmail(mailbox.resourceId, payload as V1SendRequest);
    } catch {
      return Response.json({ error: "Delivery failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
}
