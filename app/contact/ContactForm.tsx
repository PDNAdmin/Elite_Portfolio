"use client";

import { useState } from "react";
import { ArrowRight, MailOpenIcon, MessageSquareMore, UserIcon } from "lucide-react";

// Messages are sent with EmailJS (https://www.emailjs.com) straight from the browser.
// Set these three in .env.local and in Vercel. Without them the form opens the
// visitor's email app instead.
const emailjs = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const emailjsReady = Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey);

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "jost w-full rounded-2xl border border-white/15 bg-black/40 pl-4 pr-12 text-[16px] text-white outline-none transition placeholder:text-white/30 hover:border-white/25 focus:border-[#F8A308]/80 focus:ring-4 focus:ring-[#F8A308]/15";
const labelClass = "jost mb-2 block text-[14px] font-medium text-white/75";

export default function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Hidden field that only bots fill in: pretend it worked
    if (data.company) {
      setStatus("sent");
      return;
    }

    const name = (data.name ?? "").trim();
    const from = (data.email ?? "").trim();
    const message = (data.message ?? "").trim();

    if (!emailjsReady) {
      // Email sending isn't configured: open the visitor's email app instead
      const subject = encodeURIComponent(`Website message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailjs.serviceId,
          template_id: emailjs.templateId,
          user_id: emailjs.publicKey,
          // Several common names, so the template works whichever ones it uses
          template_params: {
            name,
            email: from,
            message,
            from_name: name,
            from_email: from,
            reply_to: from,
            to_email: email,
            title: `New website message from ${name}`,
          },
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      console.error("EmailJS send failed", res.status, await res.text().catch(() => ""));
      setError(`Your message couldn't be sent. Please try again, or email ${email} directly.`);
      setStatus("error");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="jost space-y-3 rounded-[24px] border border-[#F8A308]/40 bg-black/40 p-8 text-white">
        <p className="unbounded text-2xl">Message sent.</p>
        <p className="text-white/60">Thanks for reaching out. You&apos;ll get a reply by email soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-[#F8A308] underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="relative">
        <label htmlFor="contact-name" className={labelClass}>Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className={`h-14 ${inputClass}`}
        />
        <UserIcon aria-hidden className="absolute bottom-4 right-4 size-5 stroke-white/35" />
      </div>
      <div className="relative">
        <label htmlFor="contact-email" className={labelClass}>Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`h-14 ${inputClass}`}
        />
        <MailOpenIcon aria-hidden className="absolute bottom-4 right-4 size-5 stroke-white/35" />
      </div>
      <div className="relative">
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Which service are you interested in, and what are your goals?"
          className={`resize-none py-3 ${inputClass}`}
        />
        <MessageSquareMore aria-hidden className="absolute right-4 top-[46px] size-5 stroke-white/35" />
      </div>
      {error && (
        <p role="alert" className="jost text-sm text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="unbounded group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#F8A308] px-6 text-[14px] font-semibold text-black shadow-[0_18px_40px_-14px_rgba(248,163,8,0.6)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Me a Message"}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 -rotate-45" />
      </button>
    </form>
  );
}
