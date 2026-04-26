const SITE_URL = "https://anyaiyouwant.com";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "D. Saul Jameson",
    alternateName: "Saul Jameson",
    url: SITE_URL,
    image: `${SITE_URL}/media/headshot.png`,
    jobTitle: "Fractional CTO & Machine Learning Engineer",
    description:
      "Machine learning engineer writing algorithms since before ChatGPT. Builds and ships ML, automation, and full-stack apps for enterprises and startups.",
    knowsAbout: [
      "Machine Learning",
      "Artificial Intelligence",
      "Forecasting",
      "Recommendation Systems",
      "Bayesian Regression",
      "Bidding Optimization",
      "Automation",
      "Web Development",
      "Fractional CTO",
      "Cloud Architecture (GCP, AWS, Azure, Hetzner)",
      "Data Pipelines",
      "Business Intelligence",
    ],
    sameAs: [
      "https://github.com/dSaulJameson",
      "https://storywarz.win",
      "https://songselfie.com",
    ],
    affiliation: {
      "@type": "Organization",
      name: "Builders & Backers Network",
      url: "https://buildersandbackers.org",
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
      "Fractional CTO and machine learning consultancy. Algorithms, automation, and apps for enterprises and startups.",
    priceRange: "$$$",
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@type": "Person", name: "D. Saul Jameson" },
    serviceType: [
      "Machine Learning Engineering",
      "Fractional CTO",
      "Automation",
      "Web Application Development",
      "AI Integration",
      "Business Intelligence",
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
    publisher: { "@type": "Person", name: "D. Saul Jameson" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
