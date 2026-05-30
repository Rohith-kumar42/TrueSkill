export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrueSkill Academy",
    url: "https://atrueskill.academy",
    logo: "https://atrueskill.academy/og-image.png",
    description:
      "Chess coaching with rigor, imagination, and a clear path from first moves to competitive confidence.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@atrueskill.academy",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
