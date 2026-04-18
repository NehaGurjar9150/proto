export type Project = {
  id: string;
  num: string;
  title: string;
  tool: string;
  toolColor: "cyan" | "magenta" | "gold";
  desc: string;
  insights: string[];
  skills: string[];
  images: string[]; // gradient placeholder seeds
  industry: string;
};

// Themed gradient "screenshots" — each image is a unique data-viz styled tile
const grad = (a: string, b: string, c: string) =>
  `linear-gradient(135deg, ${a}, ${b} 50%, ${c})`;

export const projects: Project[] = [
  {
    id: "p1",
    num: "01",
    title: "Project Management Dashboard",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "Operations",
    desc: "Unified Power BI command-center tracking project performance, risk vs complexity, team dynamics & timeline estimation across multi-project portfolios.",
    insights: [
      "Majority of projects in Execution & Initiation phase",
      "Critical-risk projects show highest complexity & duration",
      "Hybrid methodology requires larger teams",
    ],
    skills: ["Data Modeling", "DAX", "KPI Design", "Business Analysis"],
    images: [
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#0a2818", "#1e5f3a", "#ffd700"),
    ],
  },
  {
    id: "p2",
    num: "02",
    title: "BDE Performance & Lead Conversion",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "Sales",
    desc: "Funnel-to-revenue tracker analyzing Business Development Executive performance, individual conversion rates, and team-wise monthly trends.",
    insights: [
      "Identified top-performing BDEs across regions",
      "Conversion rates varied 3× across team members",
      "Drop-offs concentrated at mid-funnel stages",
    ],
    skills: ["Data Cleaning", "DAX", "KPI Design", "Visualization"],
    images: [
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#28190a", "#5f3a1e", "#ffd700"),
      grad("#0a2818", "#1e5f3a", "#00d4ff"),
    ],
  },
  {
    id: "p3",
    num: "03",
    title: "Hospital Performance Analysis",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "Healthcare",
    desc: "Operational efficiency dashboard monitoring patient volume, revenue metrics, and department-level KPIs to surface healthcare performance gaps.",
    insights: [
      "Key departments driving hospital revenue identified",
      "Clear patient volume seasonality detected",
      "Operational efficiency gaps quantified by unit",
    ],
    skills: ["Healthcare Analytics", "KPI Tracking", "DAX"],
    images: [
      grad("#0a2818", "#1e5f3a", "#00d4ff"),
      grad("#0a1628", "#1e3a5f", "#a5e8ff"),
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
    ],
  },
  {
    id: "p4",
    num: "04",
    title: "E-Commerce Sales Dashboard",
    tool: "MySQL + Power BI",
    toolColor: "magenta",
    industry: "E-Commerce",
    desc: "End-to-end pipeline integrating MySQL with Power BI to analyze online sales, customer segments, profit margins, and order trends across regions.",
    insights: [
      "Specific regions drive disproportionate revenue",
      "High-volume categories revealed low profitability",
      "Repeat customers contribute majority of revenue",
    ],
    skills: ["MySQL", "Power BI", "Segmentation", "Profit Analysis"],
    images: [
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#28190a", "#5f3a1e", "#ffd700"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#0a2818", "#1e5f3a", "#a5e8ff"),
    ],
  },
  {
    id: "p5",
    num: "05",
    title: "Electric Vehicle Adoption Analysis",
    tool: "Tableau",
    toolColor: "gold",
    industry: "Automotive",
    desc: "Market-trend dashboard analyzing EV adoption growth, state-wise distribution, vehicle-type breakdown, and year-over-year adoption velocity.",
    insights: [
      "Rapid EV growth concentrated in last 3 years",
      "Specific states dominate national EV usage",
      "Government policies directly correlate with adoption",
    ],
    skills: ["Tableau", "Market Analysis", "Trend Analysis"],
    images: [
      grad("#28190a", "#5f3a1e", "#ffd700"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#0a2818", "#1e5f3a", "#a5e8ff"),
    ],
  },
  {
    id: "p6",
    num: "06",
    title: "Jumbo King Sales Dashboard",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "F&B",
    desc: "Fast-food chain performance tracker identifying top-selling products, outlet variance, and time-of-day sales patterns to optimize menu strategy.",
    insights: [
      "Specific items drive maximum daily revenue",
      "Peak sales windows mapped per outlet",
      "Outlet-wise variance flagged for ops review",
    ],
    skills: ["Sales Analytics", "Time Analysis", "Power BI"],
    images: [
      grad("#28190a", "#5f3a1e", "#ff006e"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#0a2818", "#1e5f3a", "#ffd700"),
    ],
  },
  {
    id: "p7",
    num: "07",
    title: "Pizza Sales Dashboard",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "F&B",
    desc: "Sales-performance dashboard mapping pizza category and size preferences, revenue trends, and top/bottom performing SKUs over time.",
    insights: [
      "Large-size pizzas generate disproportionate revenue",
      "Specific categories consistently top-selling",
      "Clear seasonal revenue patterns surfaced",
    ],
    skills: ["Sales Analysis", "Product Analytics", "DAX"],
    images: [
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#28190a", "#5f3a1e", "#ffd700"),
    ],
  },
  {
    id: "p8",
    num: "08",
    title: "Sweet Surge Analyzer",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "F&B",
    desc: "Dessert-category demand tracker with product-wise breakdown, seasonal trends, and revenue-impact analysis for stock planning.",
    insights: [
      "Seasonal demand swings dominate sales",
      "Few products drive majority of revenue",
      "Forecast-ready demand patterns identified",
    ],
    skills: ["Demand Analysis", "Seasonal Trends", "Power BI"],
    images: [
      grad("#0a2818", "#1e5f3a", "#ffd700"),
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
    ],
  },
  {
    id: "p9",
    num: "09",
    title: "Coffee Sales Dashboard",
    tool: "Power BI",
    toolColor: "cyan",
    industry: "Retail",
    desc: "Interactive retail-coffee dashboard analyzing customer purchase patterns and revenue trends across coffee, tea, and bakery categories.",
    insights: [
      "Peak sales clustered at specific hours & days",
      "Few products drive majority of revenue",
      "Seasonal purchasing trends mapped clearly",
    ],
    skills: ["Retail Analytics", "Time-Series", "Forecasting"],
    images: [
      grad("#28190a", "#5f3a1e", "#ffd700"),
      grad("#0a1628", "#1e3a5f", "#00d4ff"),
      grad("#1a0a28", "#3a1e5f", "#ff006e"),
      grad("#0a2818", "#1e5f3a", "#a5e8ff"),
    ],
  },
];
