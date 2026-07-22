export const services = [
  {
    slug: "software-development",
    title: "Software development",
    short: "From one-day tools to production platforms, in the language and stack that fit the job.",
    bullets: ["Web and mobile applications", "Internal tools and data products", "APIs, integrations, and cloud infrastructure"],
  },
  {
    slug: "machine-learning",
    title: "Machine learning",
    short: "Forecasting, optimization, recommendation, clustering, and measurement—not AI as a buzzword.",
    bullets: ["Bayesian marketing mix models", "ARIMA, Prophet, and demand forecasting", "Recommendation and lead-scoring systems"],
  },
  {
    slug: "secure-ai",
    title: "Secure AI",
    short: "Useful AI systems designed around your privacy, risk tolerance, and existing security boundaries.",
    bullets: ["Private and self-hosted models", "Data masking and controlled retrieval", "Model evaluation, guardrails, and audit trails"],
  },
  {
    slug: "analytics",
    title: "Analytics and BI",
    short: "Decision-ready reporting built around the operating questions your team actually asks.",
    bullets: ["Executive and operational dashboards", "Metric design and attribution", "Data warehouses and reliable pipelines"],
  },
  {
    slug: "automation",
    title: "Automation",
    short: "Code-first workflows that remain understandable when the easy connector stops being enough.",
    bullets: ["Custom Python and TypeScript systems", "Queues, webhooks, retries, and deduplication", "n8n or Zapier only when they are the right layer"],
  },
  {
    slug: "technical-leadership",
    title: "Technical leadership",
    short: "Architecture, delivery, hiring, and technical decisions from people who can also implement them.",
    bullets: ["Fractional CTO and technical due diligence", "Architecture and vendor review", "Roadmaps tied to shipped work"],
  },
] as const;

export const industries = [
  {
    slug: "cpg",
    name: "Consumer packaged goods",
    dashboard: "cpg-analytics",
    summary: "Forecast demand, understand promotion lift, protect margin, and keep inventory aligned with the shelf.",
    kpis: ["Forecast accuracy", "Promotion lift", "Distribution velocity", "Gross margin", "Out-of-stock rate", "Trade-spend ROI"],
    useCases: ["SKU and account forecasting", "Price and promotion modeling", "Retailer scorecards", "Consumer and store clustering"],
  },
  {
    slug: "home-services",
    name: "Home services",
    dashboard: "home-services-analytics",
    summary: "Turn lead flow into booked jobs with clearer attribution, territory intelligence, and capacity-aware forecasting.",
    kpis: ["Cost per qualified lead", "Appointment rate", "Close rate", "Revenue per issued lead", "Crew utilization", "Cancellation rate"],
    useCases: ["Lead scoring by ZIP code", "Kitchen and bath pipeline analytics", "Windows and solar attribution", "Call-center and crew forecasting"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    dashboard: "ecommerce-analytics",
    summary: "Connect acquisition, merchandising, retention, and fulfillment so growth is measured in contribution—not clicks.",
    kpis: ["Contribution margin", "Customer acquisition cost", "Repeat purchase rate", "Average order value", "Return rate", "Inventory turns"],
    useCases: ["Product recommendations", "Customer lifetime value", "Merchandising analytics", "Incrementality and channel attribution"],
  },
  {
    slug: "event-marketing",
    name: "Event marketing",
    dashboard: "event-marketing-analytics",
    summary: "Measure the whole event funnel—from registration source to attendance, pipeline, sponsorship, and repeat participation.",
    kpis: ["Registration conversion", "Attendance rate", "Cost per attendee", "Sponsor pipeline", "Revenue per event", "Repeat attendance"],
    useCases: ["Event portfolio scorecards", "Audience segmentation", "Sponsor attribution", "Registration and attendance forecasting"],
  },
  {
    slug: "legal",
    name: "Legal",
    dashboard: "legal-analytics",
    summary: "Improve intake, case visibility, document workflows, and matter economics without compromising client confidentiality.",
    kpis: ["Qualified intake rate", "Consultation conversion", "Cost per signed matter", "Matter cycle time", "Utilization", "Realization rate"],
    useCases: ["Secure document search", "Intake prioritization", "Matter and referral analytics", "Demand and staffing forecasts"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    dashboard: "real-estate-analytics",
    summary: "Build a clean view of markets, listings, leads, transactions, and follow-up across fragmented systems.",
    kpis: ["Lead-to-appointment rate", "Days on market", "Listing conversion", "Pipeline value", "Cost per closing", "Forecast accuracy"],
    useCases: ["Market and parcel data products", "Lead routing and scoring", "Agent performance analytics", "Transaction workflow automation"],
  },
  {
    slug: "hospitality-nightlife",
    name: "Bars, restaurants, and nightlife",
    dashboard: "hospitality-analytics",
    summary: "Understand traffic, reservations, labor, promotions, and guest behavior by venue, night, and acquisition channel.",
    kpis: ["Revenue per available seat hour", "Average check", "Labor percentage", "Guest acquisition cost", "Repeat visit rate", "No-show rate"],
    useCases: ["Demand and staffing forecasts", "Promotion measurement", "Guest segmentation", "Venue and event scorecards"],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    dashboard: "cannabis-retail-analytics",
    summary: "Combine compliant retail data, product performance, inventory, and promotion analytics in one operating view.",
    kpis: ["Net sales", "Basket size", "Inventory turns", "Discount rate", "Repeat purchase rate", "Gross margin"],
    useCases: ["Brand and SKU scorecards", "Demand planning", "Promotion lift", "Store and customer segmentation"],
  },
] as const;

export const insights = [
  {
    slug: "marketing-mix-modeling",
    title: "Marketing mix modeling",
    eyebrow: "Measurement / Bayesian regression",
    description: "How Bayesian regression and repeated simulation help estimate channel contribution, uncertainty, saturation, and better budget ranges.",
    sections: [
      ["A model of the business, not a prettier attribution report", "A marketing mix model relates outcomes such as revenue or qualified leads to media spend while accounting for seasonality, pricing, promotions, distribution, economic conditions, and other drivers. It is especially useful when click-level attribution is incomplete or misleading."],
      ["Why Bayesian", "Bayesian regression does not return one falsely precise answer. It estimates a distribution of plausible effects. Prior knowledge can be included transparently, sparse channels can be regularized, and the output carries credible ranges that decision-makers can inspect."],
      ["Where Monte Carlo fits", "Sampling methods run the model many times across plausible parameter combinations. Those repeated draws reveal peaks, valleys, diminishing returns, and uncertainty. Budget scenarios can then be simulated against the full range of likely responses instead of a single average coefficient."],
      ["What optimization actually means", "The goal is not to hand every dollar to the channel with the highest historic ROAS. A useful optimizer respects saturation, minimum commitments, channel interactions, testing budgets, operational capacity, and the cost of being wrong."],
    ],
    steps: ["Unify weekly outcomes, spend, and business drivers", "Specify carryover, saturation, seasonality, and priors", "Fit and validate against holdouts and known experiments", "Simulate budget allocations with uncertainty", "Refresh as new spend and outcomes arrive"],
    cta: { label: "Explore the marketing dashboard", href: "/demos/marketing-analytics" },
  },
  {
    slug: "demand-forecasting",
    title: "Demand forecasting",
    eyebrow: "Forecasting / CPG and retail",
    description: "When ARIMA, Prophet, regression, and hierarchical forecasts help—and why the hard part is usually the operating system around the model.",
    sections: [
      ["Start with the decision", "A forecast for purchasing has different costs than a forecast for staffing or cash planning. The horizon, level of detail, update cadence, and penalty for over- versus under-forecasting should be chosen around that decision."],
      ["ARIMA and classical time series", "ARIMA-family models are strong baselines when a series has stable autocorrelation and enough history. They are interpretable, fast, and often difficult to beat for mature products with consistent patterns."],
      ["Prophet and business seasonality", "Prophet can be useful when holiday effects, multiple seasonal cycles, and missing observations need to be modeled quickly. It is a practical tool—not a universal winner—and should be compared with simpler baselines."],
      ["What production forecasting adds", "Retail and CPG forecasts often need promotions, price, weather, distribution, product hierarchy, stockouts, and launch or discontinuation logic. Backtesting, reconciliation, exception handling, and human overrides matter as much as the model name."],
    ],
    steps: ["Define the decision and error cost", "Build naive and seasonal baselines", "Backtest candidate models over rolling windows", "Add causal drivers where they improve holdouts", "Monitor bias, accuracy, and override behavior"],
    cta: { label: "Explore the CPG dashboard", href: "/demos/cpg-analytics" },
  },
  {
    slug: "secure-private-ai",
    title: "Secure and private AI",
    eyebrow: "AI engineering / Security",
    description: "A practical architecture for using models without treating sensitive business data as free training material.",
    sections: [
      ["Choose the boundary first", "Some workloads can safely use a hosted model with contractual controls. Others require a private endpoint, a dedicated cloud environment, or a model hosted on infrastructure you control. The right answer follows the data classification and threat model."],
      ["Minimize what the model sees", "Sensitive identifiers can be removed, tokenized, generalized, or replaced before a request leaves the trusted boundary. Retrieval should expose only the smallest relevant context and every permission check should happen outside the model."],
      ["Treat prompts and outputs as untrusted", "Prompt injection, data exfiltration, hallucination, and unsafe tool calls are engineering problems. Constrained tools, allowlists, evaluation suites, human approval, and audit logs are more important than a clever system prompt."],
      ["Small projects can still matter", "A focused data-masking gateway, secure document prototype, or model-hosting assessment can often be completed in a day. The result may be a production component, a tested proof of concept, or a clear go/no-go decision."],
    ],
    steps: ["Classify the data and threat model", "Select hosted, private, or self-hosted inference", "Minimize and disguise sensitive context", "Constrain tools and permissions", "Evaluate leakage, accuracy, and failure modes"],
    cta: { label: "Send a secure AI brief", href: "/book?project=secure-ai" },
  },
  {
    slug: "customer-segmentation",
    title: "Customer segmentation that changes decisions",
    eyebrow: "Machine learning / Clustering",
    description: "How clustering can reveal useful customer or store groups without turning the analysis into decorative personas.",
    sections: [
      ["Clustering is an exploratory tool", "K-means, hierarchical clustering, mixtures, and density-based methods organize similar observations. They do not discover objective customer species. A good segment is stable enough to understand and different enough to change an action."],
      ["Representation decides the result", "Recency, frequency, margin, category mix, channel behavior, geography, and lifecycle often matter more than the clustering algorithm. Scaling, transformations, missingness, and time windows can completely change the groups."],
      ["Validate with behavior", "Useful segments predict a difference outside the variables used to build them: response to a promotion, churn risk, support cost, product affinity, or service capacity. If nobody can act differently, the segmentation is unfinished."],
    ],
    steps: ["Tie segments to an operating decision", "Engineer behavior and value features", "Compare multiple clustering approaches", "Test stability and out-of-sample differences", "Deploy understandable labels and refresh rules"],
    cta: { label: "Discuss a segmentation project", href: "/book?project=machine-learning" },
  },
] as const;

export const eventCities = [
  ["los-angeles", "Los Angeles", "CA"],
  ["fullerton", "Fullerton", "CA"],
  ["orange-county", "Orange County", "CA"],
  ["san-diego", "San Diego", "CA"],
  ["irvine", "Irvine", "CA"],
  ["santa-monica", "Santa Monica", "CA"],
  ["pasadena", "Pasadena", "CA"],
  ["long-beach", "Long Beach", "CA"],
  ["newport-beach", "Newport Beach", "CA"],
  ["costa-mesa", "Costa Mesa", "CA"],
  ["anaheim", "Anaheim", "CA"],
  ["san-jose", "San Jose", "CA"],
  ["new-york", "New York", "NY"],
] as const;

export const glossaryTerms = [
  ["arima", "ARIMA", "A family of statistical time-series models that uses autoregression, differencing, and moving-average errors to forecast future values."],
  ["bayesian-regression", "Bayesian regression", "Regression that represents model parameters as probability distributions, combining prior information with observed data."],
  ["clustering", "Clustering", "Unsupervised methods that group observations by similarity so analysts can explore structure and design different actions."],
  ["embeddings", "Embeddings", "Numeric representations that place semantically similar items near one another for search, recommendation, and classification."],
  ["forecast-backtesting", "Forecast backtesting", "Repeatedly training on historical cutoffs and evaluating later periods to estimate how a forecasting system will behave in production."],
  ["incrementality", "Incrementality", "The change caused by an intervention compared with what would have happened without it."],
  ["large-language-model", "Large language model", "A probabilistic model trained on large text collections to predict and generate sequences of tokens."],
  ["marketing-mix-model", "Marketing mix model", "A statistical model that estimates how media and business drivers contribute to an outcome over time."],
  ["monte-carlo-simulation", "Monte Carlo simulation", "Repeated random sampling used to estimate a range of possible outcomes and the uncertainty around them."],
  ["prophet", "Prophet", "An additive forecasting approach designed for business time series with trend, seasonal, holiday, and event effects."],
  ["rag", "Retrieval-augmented generation", "A pattern that retrieves approved source material and supplies it to a generative model at request time."],
  ["recommendation-system", "Recommendation system", "A system that ranks products, content, or actions for a user or context using behavior, attributes, and feedback."],
  ["synthetic-data", "Synthetic data", "Artificially generated records designed to preserve useful statistical patterns without directly reproducing source records."],
] as const;

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug);
}

export function getEventCity(slug: string) {
  const city = eventCities.find((item) => item[0] === slug);
  return city ? { slug: city[0], name: city[1], state: city[2] } : undefined;
}

export function getGlossaryTerm(slug: string) {
  const term = glossaryTerms.find((item) => item[0] === slug);
  return term ? { slug: term[0], name: term[1], definition: term[2] } : undefined;
}
