"use client";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm({
  lang,
  reduced,
}: {
  lang: "en" | "ar";
  reduced: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    setState(res.ok ? "sent" : "error");
    if (res.ok) e.currentTarget.reset();
  }
  const ar = lang === "ar";
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <p>new-message.sh</p>
      </div>
      <form onSubmit={submit}>
        <label>
          <span>01 / {ar ? "الاسم" : "NAME"}</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder={ar ? "اسمك" : "Your name"}
          />
        </label>
        <label>
          <span>02 / {ar ? "البريد الإلكتروني" : "EMAIL"}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
        <label className="message-field">
          <span>03 / {ar ? "الرسالة" : "MESSAGE"}</span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder={
              ar
                ? "أخبرني عن مشروعك..."
                : "Tell me about the problem you’re solving..."
            }
          />
        </label>
        <button
          className="send-button"
          disabled={state === "sending"}
          type="submit"
        >
          <span>
            {state === "sending"
              ? ar
                ? "جارٍ الإرسال"
                : "Sending..."
              : state === "sent"
                ? ar
                  ? "تم الإرسال"
                  : "Message sent"
                : ar
                  ? "إرسال الرسالة"
                  : "Send message"}
          </span>
          <Send size={18} />
          {state === "sent" && !reduced && (
            <motion.i
              initial={{ x: -150, opacity: 1 }}
              animate={{ x: 20, opacity: 0 }}
            />
          )}
        </button>
        {state === "error" && (
          <p role="alert" className="form-error">
            Unable to send. Please try again.
          </p>
        )}
      </form>
      <p className="terminal-note">
        <span>$</span>{" "}
        {ar ? "عادةً أرد خلال 48 ساعة" : "I usually respond within 48 hours"}
      </p>
    </div>
  );
}
