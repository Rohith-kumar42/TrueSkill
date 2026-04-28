import { Mail, MapPin, Phone } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { ContactForm } from "@/components/ui/ContactForm";
import { GlowCard } from "@/components/ui/GlowCard";

const details = [
  { icon: Mail, label: "Email", value: "hello@atrueskill.academy" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Location", value: "Online and academy cohorts" }
];

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="pt-32">
        <div className="section-shell py-16">
          <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Contact</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,6.2rem)] font-black leading-none text-balance">
            Begin a conversation about the right chess path.
          </h1>
        </div>
      </section>
      <section className="pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />
          <div className="grid gap-5">
            {details.map((item) => (
              <GlowCard key={item.label}>
                <item.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-cinzel text-sm uppercase tracking-[0.16em] text-gold">{item.label}</h2>
                <p className="mt-2 text-lg text-ivory/78">{item.value}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
