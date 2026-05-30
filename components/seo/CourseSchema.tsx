interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  level?: string;
  price?: string;
  schedule?: string;
}

export default function CourseSchema({
  name,
  description,
  url,
  level,
  price,
  schedule,
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    ...(level && { courseLevel: level }),
    provider: {
      "@type": "Organization",
      name: "TrueSkill Academy",
      url: "https://atrueskill.academy",
    },
    offers: {
      "@type": "Offer",
      category: "Chess Coaching",
      areaServed: "India",
      ...(price && { price, priceCurrency: "INR" }),
      ...(schedule && { description: schedule }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
