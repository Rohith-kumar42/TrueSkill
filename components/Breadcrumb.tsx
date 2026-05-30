import Link from "next/link";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const schemaData = crumbs.map((c) => ({
    name: c.label,
    url: `https://atrueskill.academy${c.href}`,
  }));

  return (
    <>
      <BreadcrumbSchema crumbs={schemaData} />
      <nav aria-label="Breadcrumb" className="section-shell pt-24 pb-0">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ivory/50">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1">
              {i > 0 && (
                <span className="mx-1 text-ivory/30" aria-hidden="true">
                  /
                </span>
              )}
              {i < crumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="font-cinzel text-xs uppercase tracking-[0.12em] text-gold/70 hover:text-gold transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="font-cinzel text-xs uppercase tracking-[0.12em] text-ivory/70"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
