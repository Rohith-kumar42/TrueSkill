export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "TrueSkill Academy",
    url: "https://atrueskill.academy",
    image: "https://atrueskill.academy/og-image.png",
    description:
      "TrueSkill Academy offers expert chess coaching for kids and adults. Structured programs from beginner to advanced with strategic thinking and competitive readiness.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 06:00-21:00",
    priceRange: "₹₹",
    email: "hello@atrueskill.academy",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
