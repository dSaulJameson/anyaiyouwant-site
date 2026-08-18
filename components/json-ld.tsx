const SITE_URL = "https://www.anyaiyouwant.com";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "D. Saul Jameson",
    alternateName: "Saul Jameson",
    url: SITE_URL,
    image: `${SITE_URL}/media/headshot.png`,
    jobTitle: "Founder and Technical Director",
    description:
      "Leads a strategy and execution company building growth systems, full-stack software, data systems, machine learning, and secure AI.",
    knowsAbout: [
      "Product Engineering",
      "Full-Stack Software Development",
      "Machine Learning",
      "Artificial Intelligence",
      "Forecasting",
      "Recommendation Systems",
      "Bayesian Regression",
      "Bidding Optimization",
      "Automation",
      "Web Development",
      "Fractional CTO",
      "Application Modernization",
      "Marketing Automation",
      "Social Publishing Systems",
      "Growth Marketing",
      "Media Buying",
      "Business Strategy",
      "Business Planning",
      "Launch Planning",
      "Technical SEO",
      "Cloud Architecture",
      "Vertex AI",
      "SageMaker",
      "Azure ML",
      "Hugging Face",
      "Data Pipelines",
      "Business Intelligence",
    ],
    sameAs: [
      "https://github.com/dSaulJameson",
      "https://www.buildandback.com/",
    ],
    affiliation: {
      "@type": "Organization",
      name: "Builders & Backers Network",
      url: "https://www.buildandback.com/",
    },
    email: "mailto:Saul@anyaiyouwant.com",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProfessionalServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Any AI You Want",
    url: SITE_URL,
    image: `${SITE_URL}/media/logo-white.png`,
    description:
      "A senior strategy and execution company delivering growth marketing, business planning, U.S.-based product engineering, full-stack software, data systems, machine learning, and secure AI.",
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@type": "Person", name: "D. Saul Jameson" },
    serviceType: [
      "Product Engineering and Delivery",
      "Full-Stack Software Development",
      "Secure and Private AI",
      "Software Development",
      "Fractional CTO Services",
      "Machine Learning Engineering",
      "Application Modernization",
      "Growth Marketing and Media Buying",
      "Social Media Strategy and Management",
      "Paid Media Management",
      "Business Strategy and Execution",
      "Business Planning",
      "Operator Decision Sprints",
      "Launch Planning",
      "Data and Analytics Engineering",
      "Technical SEO and Generative Engine Optimization",
      "Marketing Mix Modeling",
      "Demand Forecasting",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "Saul@anyaiyouwant.com",
      contactType: "sales",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Any AI You Want",
    url: SITE_URL,
    publisher: { "@type": "Organization", name: "Any AI You Want", url: SITE_URL },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@type": "Organization", name: "Any AI You Want", url: SITE_URL },
    areaServed: { "@type": "Country", name: "United States" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ArticleJsonLd({ title, description, path, publishedAt, modifiedAt }: { title: string; description: string; path: string; publishedAt?: string; modifiedAt?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt || "2026-07-26",
    author: { "@type": "Person", name: "D. Saul Jameson", url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: "Any AI You Want", url: SITE_URL },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function DefinedTermJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url: `${SITE_URL}${path}`,
    inDefinedTermSet: { "@type": "DefinedTermSet", name: "Any AI You Want Technical Glossary", url: `${SITE_URL}/glossary` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function EventListJsonLd({ events }: { events: { title: string; url: string; startsAt: string; venue: string | null; city: string | null }[] }) {
  const data = events.slice(0, 20).map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startsAt,
    url: event.url,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.venue || event.city ? {
      "@type": "Place",
      name: event.venue || event.city || "Event venue",
      address: event.city ? { "@type": "PostalAddress", addressLocality: event.city } : undefined,
    } : undefined,
  }));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
