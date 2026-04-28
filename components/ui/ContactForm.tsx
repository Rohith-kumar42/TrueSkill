"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="glass-surface chess-corners rounded-lg p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm text-ivory/80">
          Name
          <input required name="name" className="rounded border border-gold/20 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-gold" />
        </label>
        <label className="grid gap-2 text-sm text-ivory/80">
          Email
          <input required type="email" name="email" className="rounded border border-gold/20 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-gold" />
        </label>
        <label className="grid gap-2 text-sm text-ivory/80">
          Message
          <textarea required name="message" rows={5} className="rounded border border-gold/20 bg-white/5 px-4 py-3 text-ivory outline-none focus:border-gold" />
        </label>
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 rounded bg-gold px-5 py-3 font-cinzel text-sm font-semibold uppercase tracking-[0.14em] text-[#120d08] shadow-gold">
          <Send className="h-4 w-4" /> Submit
        </button>
        <p aria-live="polite" className="min-h-6 text-sm text-success">
          {sent ? "Thanks. Your enquiry is ready for the TrueSkill team." : ""}
        </p>
      </div>
    </form>
  );
}
