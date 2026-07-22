const SITE_URL = "https://www.anyaiyouwant.com";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "D. Saul Jameson",
    alternateName: "Saul Jameson",
    url: SITE_URL,
    image: `${SITE_URL}/media/headshot.png`,
    jobTitle: "Machine Learning Engineer and Technical Director",
    description:
      "Leads a U.S.-based engineering studio building software, analytics, machine learning, secure AI, and production automation for enterprises and startups.",
    knowsAbout: [
      "Custom AI Solutions",
      "Machine Learning",
      "Artificial Intelligence",
      "Forecasting",
      "Recommendation Systems",
      "Bayesian Regression",
      "Bidding Optimization",
      "Automation",
      "Web Development",
      "Fractional CTO",
      "AI Strategy",
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
      "U.S.-based senior engineers building custom software, analytics, machine learning, secure AI, automation, and data products for enterprises and startups.",
    priceRange: "$$$",
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@type": "Person", name: "D. Saul Jameson" },
    serviceType: [
      "Custom AI Solutions",
      "Secure and Private AI",
      "Software Development",
      "Fractional CTO Services",
      "Machine Learning Engineering",
      "AI Strategy & Consulting",
      "Automation",
      "Web Application Development",
      "AI Integration",
      "Business Intelligence",
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
    publisher: { "@type": "Person", name: "D. Saul Jameson" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
