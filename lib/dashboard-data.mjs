const PERIOD_START = "2023-07-01";
const PERIOD_END = "2026-06-01";

const ratio = (numerator, denominator, options = {}) => ({
  type: "ratio",
  numerator,
  denominator,
  ...options,
});
const sum = (field) => ({ type: "sum", field });

export const dashboardConfigs = [
  {
    slug: "marketing-analytics",
    title: "Marketing Performance",
    category: "Growth intelligence",
    description: "Portfolio spend, attribution, pipeline, and channel efficiency across paid and owned media.",
    model: "marketing",
    accent: "#22d3ee",
    segmentLabel: "Objective",
    segments: ["Demand generation", "E-commerce", "Lead generation", "Brand awareness"],
    locations: ["Los Angeles", "Orange County", "San Diego", "Phoenix"],
    channels: ["Paid Search", "Paid Social", "Programmatic", "Email & CRM"],
    base: 8200,
    metrics: [
      { key: "spend", label: "Managed spend", format: "currency", calc: sum("spend") },
      { key: "revenue", label: "Attributed revenue", format: "currency", calc: sum("revenue") },
      { key: "roas", label: "Blended ROAS", format: "ratio", calc: ratio("revenue", "spend") },
      { key: "cpa", label: "Cost per acquisition", format: "money", direction: "down", calc: ratio("spend", "conversions") },
      { key: "conversionRate", label: "Lead conversion", format: "percent", calc: ratio("conversions", "leads") },
      { key: "pacing", label: "Budget pacing", format: "percent", calc: ratio("spend", "plannedSpend") },
    ],
    primaryMetric: "revenue",
    secondaryMetric: "spend",
    trendTitle: "Revenue and media investment",
    segmentTitle: "Return by campaign objective",
  },
  {
    slug: "cannabis-retail-analytics",
    title: "Cannabis Retail Intelligence",
    category: "Regulated retail",
    description: "Multi-location sales, margin, inventory return, customer quality, and assortment health.",
    model: "retail",
    accent: "#a3e635",
    segmentLabel: "Category",
    segments: ["Flower", "Pre-rolls", "Vapes", "Edibles"],
    locations: ["North Park", "Oceanside", "Encinitas", "Chula Vista"],
    channels: ["In-store", "Pickup", "Delivery", "Loyalty offers"],
    base: 3100,
    metrics: [
      { key: "netSales", label: "Net sales", format: "currency", calc: sum("netSales") },
      { key: "grossMargin", label: "Gross margin", format: "percent", calc: ratio("grossProfit", "netSales") },
      { key: "avgBasket", label: "Average basket", format: "money", calc: ratio("netSales", "transactions") },
      { key: "gmroi", label: "Annualized GMROI", format: "ratio", calc: ratio("grossProfit", "inventoryCost", { annualize: true }) },
      { key: "sellThrough", label: "Sell-through", format: "percent", calc: ratio("unitsSold", "unitsReceived") },
      { key: "repeatRate", label: "Repeat customer rate", format: "percent", calc: ratio("repeatTransactions", "transactions") },
    ],
    primaryMetric: "netSales",
    secondaryMetric: "grossMargin",
    trendTitle: "Sales and gross margin",
    segmentTitle: "Category contribution",
  },
  {
    slug: "cpg-analytics",
    title: "CPG Growth & Forecasting",
    category: "Consumer packaged goods",
    description: "Sell-in, margin, trade spend, forecast accuracy, and inventory coverage across product lines.",
    model: "cpg",
    accent: "#f59e0b",
    segmentLabel: "Product line",
    segments: ["Food & beverage", "Beauty", "Supplements", "Household"],
    locations: ["West", "Southwest", "Midwest", "Northeast"],
    channels: ["Grocery", "Mass retail", "Marketplace", "Direct-to-consumer"],
    base: 28000,
    metrics: [
      { key: "netRevenue", label: "Net revenue", format: "currency", calc: sum("netRevenue") },
      { key: "grossMargin", label: "Gross margin", format: "percent", calc: ratio("grossProfit", "netRevenue") },
      { key: "units", label: "Units sold", format: "number", calc: sum("units") },
      { key: "tradeSpend", label: "Trade spend", format: "percent", direction: "down", calc: ratio("tradeSpend", "grossRevenue") },
      { key: "forecastAccuracy", label: "Forecast accuracy", format: "percent", calc: ratio("forecastError", "netRevenue", { invert: true }) },
      { key: "weeksSupply", label: "Weeks of supply", format: "decimal", direction: "neutral", calc: ratio("inventoryUnits", "units", { scale: 4.345 }) },
    ],
    primaryMetric: "netRevenue",
    secondaryMetric: "grossMargin",
    trendTitle: "Revenue and gross margin",
    segmentTitle: "Product-line performance",
  },
  {
    slug: "home-services-analytics",
    title: "Home Services Operations",
    category: "Lead-to-job intelligence",
    description: "Lead quality, appointments, close rate, booked revenue, and gross margin by service line and territory.",
    model: "homeServices",
    accent: "#38bdf8",
    segmentLabel: "Service line",
    segments: ["Kitchens", "Bathrooms", "Windows", "Solar"],
    locations: ["Los Angeles", "Orange County", "Inland Empire", "San Diego"],
    channels: ["Paid Search", "Local Services Ads", "Referral", "Organic"],
    base: 8,
    metrics: [
      { key: "qualifiedLeads", label: "Qualified leads", format: "number", calc: sum("qualifiedLeads") },
      { key: "appointmentRate", label: "Appointment set rate", format: "percent", calc: ratio("appointments", "qualifiedLeads") },
      { key: "closeRate", label: "Close rate", format: "percent", calc: ratio("soldJobs", "appointments") },
      { key: "bookedRevenue", label: "Booked revenue", format: "currency", calc: sum("bookedRevenue") },
      { key: "revenuePerLead", label: "Revenue per lead", format: "money", calc: ratio("bookedRevenue", "qualifiedLeads") },
      { key: "grossMargin", label: "Job gross margin", format: "percent", calc: ratio("grossProfit", "bookedRevenue") },
    ],
    primaryMetric: "bookedRevenue",
    secondaryMetric: "qualifiedLeads",
    trendTitle: "Booked revenue and lead volume",
    segmentTitle: "Service-line production",
  },
  {
    slug: "ecommerce-analytics",
    title: "E-commerce Profitability",
    category: "Digital commerce",
    description: "Conversion, order economics, acquisition cost, retention, and contribution margin across storefront channels.",
    model: "ecommerce",
    accent: "#a78bfa",
    segmentLabel: "Department",
    segments: ["Core products", "New releases", "Bundles", "Subscriptions"],
    locations: ["United States", "Canada", "United Kingdom", "Australia"],
    channels: ["Direct", "Paid Social", "Paid Search", "Marketplace"],
    base: 9000,
    metrics: [
      { key: "netRevenue", label: "Net revenue", format: "currency", calc: sum("netRevenue") },
      { key: "conversionRate", label: "Conversion rate", format: "percent", calc: ratio("orders", "sessions") },
      { key: "aov", label: "Average order value", format: "money", calc: ratio("netRevenue", "orders") },
      { key: "cac", label: "Customer acquisition cost", format: "money", direction: "down", calc: ratio("marketingSpend", "newCustomers") },
      { key: "repeatRate", label: "Repeat purchase rate", format: "percent", calc: ratio("repeatOrders", "orders") },
      { key: "contributionMargin", label: "Contribution margin", format: "percent", calc: ratio("contributionProfit", "netRevenue") },
    ],
    primaryMetric: "netRevenue",
    secondaryMetric: "contributionMargin",
    trendTitle: "Revenue and contribution margin",
    segmentTitle: "Department profitability",
  },
  {
    slug: "event-marketing-analytics",
    title: "Event Marketing Impact",
    category: "Experiential marketing",
    description: "Registration, attendance, sponsor economics, influenced pipeline, and event return by format and market.",
    model: "events",
    accent: "#fb7185",
    segmentLabel: "Event format",
    segments: ["Conferences", "Field events", "Community events", "Executive dinners"],
    locations: ["Los Angeles", "Orange County", "San Diego", "Phoenix"],
    channels: ["Partner", "Email", "Paid Social", "Community"],
    base: 11,
    metrics: [
      { key: "registrations", label: "Registrations", format: "number", calc: sum("registrations") },
      { key: "attendanceRate", label: "Attendance rate", format: "percent", calc: ratio("attendees", "registrations") },
      { key: "costPerAttendee", label: "Cost per attendee", format: "money", direction: "down", calc: ratio("eventSpend", "attendees") },
      { key: "sponsorRevenue", label: "Sponsor revenue", format: "currency", calc: sum("sponsorRevenue") },
      { key: "pipeline", label: "Pipeline influenced", format: "currency", calc: sum("pipeline") },
      { key: "eventRoi", label: "Event ROI", format: "percent", calc: ratio("returnValue", "eventSpend", { subtractOne: true }) },
    ],
    primaryMetric: "pipeline",
    secondaryMetric: "sponsorRevenue",
    trendTitle: "Influenced pipeline and sponsor revenue",
    segmentTitle: "Impact by event format",
  },
  {
    slug: "legal-analytics",
    title: "Legal Practice Performance",
    category: "Professional services",
    description: "Intake, matter conversion, utilization, realization, collections, and working-capital visibility.",
    model: "legal",
    accent: "#e2b96f",
    segmentLabel: "Practice area",
    segments: ["Business", "Employment", "Estate planning", "Litigation"],
    locations: ["Los Angeles", "Orange County", "San Diego", "Remote"],
    channels: ["Referral", "Organic Search", "Paid Search", "Partner network"],
    base: 2.8,
    metrics: [
      { key: "newMatters", label: "New matters", format: "number", calc: sum("newMatters") },
      { key: "intakeConversion", label: "Intake conversion", format: "percent", calc: ratio("newMatters", "consultations") },
      { key: "utilization", label: "Utilization", format: "percent", calc: ratio("billableHours", "availableHours") },
      { key: "realization", label: "Realization", format: "percent", calc: ratio("collectedRevenue", "billedValue") },
      { key: "collectedRevenue", label: "Collected fees", format: "currency", calc: sum("collectedRevenue") },
      { key: "collectionDays", label: "Average collection cycle", format: "days", direction: "down", calc: ratio("collectionDaySum", "newMatters") },
    ],
    primaryMetric: "collectedRevenue",
    secondaryMetric: "realization",
    trendTitle: "Collections and realization",
    segmentTitle: "Fees by practice area",
  },
  {
    slug: "real-estate-analytics",
    title: "Real Estate Pipeline",
    category: "Brokerage intelligence",
    description: "Lead conversion, listing performance, transaction velocity, commission income, and pipeline coverage.",
    model: "realEstate",
    accent: "#34d399",
    segmentLabel: "Business line",
    segments: ["Residential", "Luxury", "Commercial", "Investment"],
    locations: ["Los Angeles", "Orange County", "San Diego", "Palm Springs"],
    channels: ["Sphere & referral", "Portal", "Paid Search", "Open house"],
    base: 4.8,
    metrics: [
      { key: "closedVolume", label: "Closed volume", format: "currency", calc: sum("closedVolume") },
      { key: "gci", label: "Gross commission income", format: "currency", calc: sum("gci") },
      { key: "leadToClose", label: "Lead-to-close rate", format: "percent", calc: ratio("closings", "leads") },
      { key: "daysToClose", label: "Average days to close", format: "days", direction: "down", calc: ratio("closeDaySum", "closings") },
      { key: "listingWin", label: "Listing win rate", format: "percent", calc: ratio("listingsWon", "listingAppointments") },
      { key: "pipeline", label: "Weighted pipeline", format: "currency", calc: sum("pipeline") },
    ],
    primaryMetric: "closedVolume",
    secondaryMetric: "pipeline",
    trendTitle: "Closed volume and weighted pipeline",
    segmentTitle: "Volume by business line",
  },
  {
    slug: "hospitality-analytics",
    title: "Hospitality & Nightlife",
    category: "Venue operations",
    description: "Sales, guest spend, seat productivity, labor, prime cost, and repeat behavior across dayparts and concepts.",
    model: "hospitality",
    accent: "#f97316",
    segmentLabel: "Concept",
    segments: ["Restaurant", "Cocktail bar", "Nightclub", "Private events"],
    locations: ["Downtown LA", "Fullerton", "Newport Beach", "San Diego"],
    channels: ["Walk-in", "Reservations", "Promoter", "Private booking"],
    base: 620,
    metrics: [
      { key: "netSales", label: "Net sales", format: "currency", calc: sum("netSales") },
      { key: "revpash", label: "RevPASH", format: "money", calc: ratio("netSales", "availableSeatHours") },
      { key: "avgCheck", label: "Average check", format: "money", calc: ratio("netSales", "guests") },
      { key: "laborCost", label: "Labor cost", format: "percent", direction: "down", calc: ratio("laborCost", "netSales") },
      { key: "primeCost", label: "Prime cost", format: "percent", direction: "down", calc: ratio("primeCost", "netSales") },
      { key: "repeatRate", label: "Repeat guest rate", format: "percent", calc: ratio("repeatGuests", "guests") },
    ],
    primaryMetric: "netSales",
    secondaryMetric: "primeCost",
    trendTitle: "Sales and prime cost",
    segmentTitle: "Concept performance",
  },
];

export const dashboardSlugs = dashboardConfigs.map((config) => config.slug);

export function getDashboardConfig(slug) {
  return dashboardConfigs.find((config) => config.slug === slug) ?? null;
}

function hash(value) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0) / 4294967295;
}

function monthKeys() {
  const values = [];
  const cursor = new Date(`${PERIOD_START}T00:00:00Z`);
  const end = new Date(`${PERIOD_END}T00:00:00Z`);
  while (cursor <= end) {
    values.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return values;
}

function bounded(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function valuesFor(model, scale, random, month, segmentIndex) {
  const r = (offset) => hash(`${random}:${offset}`);
  if (model === "marketing") {
    const spend = scale;
    const impressions = spend * (95 + r(1) * 80);
    const clicks = impressions * (0.008 + r(2) * 0.018);
    const leads = clicks * (0.09 + r(3) * 0.13);
    const conversions = leads * (0.16 + r(4) * 0.22);
    return { spend, plannedSpend: spend * (0.94 + r(5) * 0.15), revenue: spend * (2.3 + r(6) * 2.4), impressions, clicks, leads, conversions };
  }
  if (model === "retail") {
    const netSales = scale;
    const grossProfit = netSales * (0.42 + r(1) * 0.13);
    const transactions = netSales / (42 + r(2) * 34);
    const unitsSold = transactions * (1.8 + r(3) * 1.35);
    return { netSales, grossProfit, transactions, unitsSold, unitsReceived: unitsSold / (0.62 + r(4) * 0.3), inventoryCost: (netSales - grossProfit) * (1.9 + r(5) * 2.1), repeatTransactions: transactions * (0.43 + r(6) * 0.29), discounts: netSales * (0.06 + r(7) * 0.1) };
  }
  if (model === "cpg") {
    const grossRevenue = scale * (1.09 + r(1) * 0.13);
    const tradeSpend = grossRevenue * (0.08 + r(2) * 0.11);
    const netRevenue = grossRevenue - tradeSpend;
    const units = netRevenue / (3.5 + segmentIndex * 2.1 + r(3) * 4);
    return { grossRevenue, tradeSpend, netRevenue, grossProfit: netRevenue * (0.31 + r(4) * 0.18), units, forecastError: netRevenue * (0.035 + r(5) * 0.14), inventoryUnits: units * (0.55 + r(6) * 1.2) };
  }
  if (model === "homeServices") {
    const leads = Math.max(1, scale);
    const qualifiedLeads = leads * (0.58 + r(1) * 0.28);
    const appointments = qualifiedLeads * (0.61 + r(2) * 0.29);
    const soldJobs = appointments * (0.24 + r(3) * 0.31);
    const ticket = [31000, 22000, 15500, 28000][segmentIndex] ?? 22000;
    const bookedRevenue = soldJobs * ticket * (0.82 + r(4) * 0.34);
    return { leads, qualifiedLeads, appointments, soldJobs, bookedRevenue, grossProfit: bookedRevenue * (0.28 + r(5) * 0.17) };
  }
  if (model === "ecommerce") {
    const sessions = scale;
    const orders = sessions * (0.017 + r(1) * 0.034);
    const netRevenue = orders * (62 + segmentIndex * 21 + r(2) * 54);
    const newCustomers = orders * (0.48 + r(3) * 0.34);
    const marketingSpend = newCustomers * (24 + r(4) * 45);
    return { sessions, orders, netRevenue, newCustomers, marketingSpend, repeatOrders: orders - newCustomers, contributionProfit: netRevenue * (0.18 + r(5) * 0.24) };
  }
  if (model === "events") {
    const registrations = Math.max(2, scale);
    const attendees = registrations * (0.61 + r(1) * 0.31);
    const eventSpend = attendees * (48 + r(2) * 96) + 1400 + segmentIndex * 900;
    const sponsorRevenue = eventSpend * (0.2 + r(3) * 0.78);
    const pipeline = attendees * (620 + r(4) * 2100);
    const attributedRevenue = pipeline * (0.07 + r(5) * 0.18);
    return { registrations, attendees, eventSpend, sponsorRevenue, pipeline, returnValue: sponsorRevenue + attributedRevenue };
  }
  if (model === "legal") {
    const leads = Math.max(1, scale);
    const consultations = leads * (0.42 + r(1) * 0.34);
    const newMatters = consultations * (0.22 + r(2) * 0.4);
    const availableHours = 38 + r(3) * 55;
    const billableHours = availableHours * (0.54 + r(4) * 0.29);
    const billedValue = billableHours * (310 + segmentIndex * 70 + r(5) * 180);
    const collectedRevenue = billedValue * (0.78 + r(6) * 0.2);
    return { leads, consultations, newMatters, availableHours, billableHours, billedValue, collectedRevenue, collectionDaySum: newMatters * (27 + r(7) * 68) };
  }
  if (model === "realEstate") {
    const leads = Math.max(1, scale);
    const listingAppointments = leads * (0.15 + r(1) * 0.25);
    const listingsWon = listingAppointments * (0.34 + r(2) * 0.34);
    const closings = leads * (0.035 + r(3) * 0.095);
    const averagePrice = 620000 + segmentIndex * 420000 + r(4) * 410000;
    const closedVolume = closings * averagePrice;
    return { leads, listingAppointments, listingsWon, closings, closedVolume, gci: closedVolume * (0.021 + r(5) * 0.011), closeDaySum: closings * (24 + r(6) * 54), pipeline: leads * averagePrice * (0.06 + r(7) * 0.08) };
  }
  const guests = Math.max(10, scale);
  const averageCheck = 28 + segmentIndex * 21 + r(1) * 42;
  const netSales = guests * averageCheck;
  const laborCost = netSales * (0.24 + r(2) * 0.13);
  const cogs = netSales * (0.22 + r(3) * 0.13);
  return { guests, netSales, availableSeatHours: netSales / (18 + r(4) * 39), laborCost, primeCost: laborCost + cogs, repeatGuests: guests * (0.29 + r(5) * 0.34) };
}

export function generateDashboardRows(slug) {
  const config = getDashboardConfig(slug);
  if (!config) return [];
  const periods = monthKeys();
  const rows = [];

  periods.forEach((period, monthIndex) => {
    const month = Number(period.slice(5, 7));
    const trend = 1 + monthIndex * 0.0085;
    const seasonality = 1 + Math.sin(((month - 1) / 12) * Math.PI * 2 - 0.7) * 0.1 + (month === 11 || month === 12 ? 0.11 : 0);
    config.segments.forEach((segment, segmentIndex) => {
      config.locations.forEach((location, locationIndex) => {
        config.channels.forEach((channel, channelIndex) => {
          const seed = `${slug}:${period}:${segment}:${location}:${channel}`;
          const noise = 0.83 + hash(seed) * 0.34;
          const segmentFactor = 0.82 + segmentIndex * 0.1;
          const locationFactor = 0.86 + locationIndex * 0.08;
          const channelFactor = 0.84 + channelIndex * 0.09;
          const shock = period === "2024-04-01" ? 0.84 : period === "2025-11-01" ? 1.14 : 1;
          const scale = config.base * trend * seasonality * noise * segmentFactor * locationFactor * channelFactor * shock;
          const values = valuesFor(config.model, scale, seed, month, segmentIndex);
          Object.keys(values).forEach((key) => { values[key] = Number(bounded(values[key], 0, Number.MAX_SAFE_INTEGER).toFixed(4)); });
          rows.push({ period, segment, location, channel, values });
        });
      });
    });
  });
  return rows;
}

export function calculateMetric(metric, rows) {
  if (!rows.length) return 0;
  const calc = metric.calc;
  if (calc.type === "sum") return rows.reduce((total, row) => total + (row.values[calc.field] || 0), 0);
  const numerator = rows.reduce((total, row) => total + (row.values[calc.numerator] || 0), 0);
  const denominator = rows.reduce((total, row) => total + (row.values[calc.denominator] || 0), 0);
  if (!denominator) return 0;
  let value = numerator / denominator;
  if (calc.invert) value = 1 - value;
  if (calc.subtractOne) value -= 1;
  if (calc.annualize) value *= 12;
  if (calc.scale) value *= calc.scale;
  return value;
}

export const dashboardPeriod = { start: PERIOD_START, end: PERIOD_END };
