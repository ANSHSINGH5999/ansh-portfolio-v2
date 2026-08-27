export const profile = {
  name: "Ansh Singh",
  role: "Blockchain Developer · Full-Stack Engineer",
  tagline: "ECE, SRM Institute of Science and Technology — Class of 2028",
  summary:
    "I write and ship smart contracts on Stellar/Soroban and Ethereum/EVM, then wrap them in production-grade full-stack apps with React, Next.js, Node.js and Firebase — plus embedded/IoT systems and AI workflow automation on the side.",
  status: "Open to Blockchain & Full-Stack Internships, Traineeships & Full-Time Roles",
  location: "Sultanpur, Uttar Pradesh, India",
  email: "anshansh5999@gmail.com",
  phone: "+91 8303959844",
  phoneDisplay: "+91 83039 59844",
  github: "https://github.com/ANSHSINGH5999",
  githubUsername: "ANSHSINGH5999",
  linkedin: "https://linkedin.com/in/ansh-singh-9607481a6",
  linkedinDisplay: "linkedin.com/in/ansh-singh-9607481a6",
  instagram: "https://instagram.com/anshansh59999",
  instagramDisplay: "instagram.com/anshansh59999",
  x: "https://x.com/anshansh5999",
  xDisplay: "x.com/anshansh5999",
  resumeFile: "/resume.pdf",
  photo: "/profile-sketch.jpg",
} as const;

/** Opens Gmail's own compose window (not a generic mailto:) pre-addressed
 * and subject-filled, so a recruiter clicking "Hire me" lands in an actual
 * draft instead of just their default mail app. */
export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email
)}&su=${encodeURIComponent("Opportunity for " + profile.name)}`;

export const skillGroups = [
  {
    title: "Blockchain / Web3",
    skills: [
      "Stellar",
      "Soroban",
      "Solidity",
      "Hardhat",
      "Foundry",
      "Wagmi v2",
      "RainbowKit",
      "Freighter Wallet",
      "DeFi",
      "Liquid Staking",
      "Sepolia / Horizon Testnets",
    ],
  },
  {
    title: "Full-Stack Development",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Node.js", "Firebase", "HTML"],
  },
  {
    title: "Languages",
    skills: ["Python", "C / C++", "JavaScript", "Solidity"],
  },
  {
    title: "Embedded / IoT",
    skills: [
      "Arduino",
      "ESP8266",
      "ESP32 / CAM",
      "Pi Pico W",
      "MQTT",
      "BLE",
      "PID Control",
      "PCB Design (KiCad)",
      "Fusion 360",
    ],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git / GitHub", "VS Code", "n8n Automation", "Claude", "GitHub Copilot"],
  },
] as const;

export const experience = {
  role: "Member, Web Dev Domain — Next Gen-AI",
  org: "SRM Institute of Science and Technology",
  period: "2025 — 2026",
  bullets: [
    "Collaborated within a cross-functional student team to plan and execute technical events and Web Dev Domain initiatives.",
    "Owned task tracking and cross-team communication, keeping deliverables on schedule across multiple concurrent activities.",
  ],
};

/**
 * Featured projects, hand-curated from the resume. `repo` is the confirmed
 * GitHub slug (verified against the live repo list) used to merge in real
 * stars/forks/language; leave it null rather than guess a slug that might
 * not exist — the card still renders, just without a live-stats badge.
 */
export const featuredProjects = [
  {
    slug: "stellarpay",
    repo: "stellarpay",
    name: "StellarPay",
    tags: ["Stellar", "Smart Contracts", "React"],
    description: "A decentralized cross-border payment platform on the Stellar blockchain.",
    bullets: [
      "Freighter wallet integration with live Horizon Testnet connectivity.",
      "Optimized transaction processing logic to cut latency for low-cost transfers.",
    ],
  },
  {
    slug: "sxlm-liquid-staking",
    repo: "sxlm-liquid-staking",
    name: "sXLM Liquid Staking",
    tags: ["Soroban", "Smart Contracts", "DeFi"],
    description: "A liquid staking protocol for XLM — stake and stay liquid.",
    bullets: [
      "Lets users earn staking rewards while retaining token liquidity.",
      "Soroban contract logic for minting, multi-asset collateral pooling and yield distribution.",
    ],
  },
  {
    slug: "stlr-token-staking",
    repo: null,
    name: "STLR Token Staking dApp",
    tags: ["Solidity", "Hardhat", "Ethereum"],
    description: "A staking dApp with reward accrual, deployed and tested end-to-end.",
    bullets: [
      "Staking, reward accrual and withdrawal logic implemented in Solidity.",
      "Foundry, Wagmi v2 and RainbowKit added for Sepolia deployment and wallet connectivity.",
    ],
  },
  {
    slug: "n8n-ai-agent-hub",
    repo: null,
    name: "n8n AI Agent Hub",
    tags: ["n8n", "Node.js", "AI Agents"],
    description: "Automated workflow systems orchestrating AI agents at scale.",
    bullets: [
      "Integrated 2,000+ AI agent tools and third-party APIs into working pipelines.",
      "Streamlined multi-step tasks: data extraction, LLM orchestration, backend triggers.",
    ],
  },
] as const;

export const achievements = [
  {
    title: "1st Position — Robofest Line Follower Competition",
    description: "Top placement in an autonomous line-following robotics competition.",
  },
  {
    title: "Technoxian 2025, Noida — Participant",
    description: "Competed at one of India's largest robotics and technology championships.",
  },
] as const;

export const education = {
  degree: "B.Tech, Electronics & Communication Engineering",
  specialization: "Specialization: Computer Engineering",
  school:
    "SRM Institute of Science and Technology — SRM Nagar, Potheri, Kattankulathur, Chengalpattu District, Tamil Nadu, India",
  expected: "Expected 2028",
  cgpa: "CGPA 8.1",
};

export const navItems = [
  { href: "#stack", label: "Skills" },
  { href: "#ledger", label: "Experience" },
  { href: "#deployed", label: "Projects" },
  { href: "#signal", label: "Activity" },
  { href: "#origin", label: "Education" },
  { href: "#connect", label: "Connect" },
] as const;
