export const portfolioData = {
  personal: {
    name: "Hitesh Kumar",
    role: "AI & Data Science Developer",
    subtitle: "AI & Data Science Developer",
    bio: "I'm a B.Tech student specializing in Artificial Intelligence and Data Science, passionate about building intelligent applications, exploring emerging technologies, and solving real-world problems through code.",
    profileImage: "/images/profile.jpg",
    resumeUrl: "/Hitesh_Kumar_Resume.pdf",
    socials: {
      github: "https://github.com/hiteshkumar-dev",
      linkedin: "https://linkedin.com/in/hiteshkumar-ai",
      email: "hiteshkumar.techdev@gmail.com",
    },
  },

  expertise: [
    {
      id: "programming",
      title: "Programming & Development",
      icon: "code",
      description:
        "I enjoy building modern web applications and writing clean, efficient code. I continuously improve my programming skills while exploring frontend and backend development.",
      techStack: [
        "Python",
        "Java",
        "JavaScript",
        "HTML5",
        "CSS3",
        "React",
        "Git",
        "GitHub",
      ],
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      icon: "chart",
      description:
        "I'm interested in transforming raw data into meaningful insights using data analysis, statistical concepts, visualization, and machine learning techniques.",
      techStack: [
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebook",
        "SQL",
        "Machine Learning",
      ],
    },
    {
      id: "ai-emerging",
      title: "AI & Emerging Technologies",
      icon: "brain",
      description:
        "I explore artificial intelligence, generative AI, automation, and intelligent applications to understand how emerging technologies can solve practical problems.",
      techStack: [
        "Generative AI",
        "LLMs",
        "Prompt Engineering",
        "AI Agents",
        "OpenAI API",
        "Machine Learning",
      ],
    },
  ],

  journey: [
    {
      id: "education",
      category: "Current Education",
      title: "Bachelor of Technology (B.Tech)",
      subtitle: "Specialization in Artificial Intelligence & Data Science",
      period: "2025 — 2029 (Expected)",
      icon: "graduation",
      description:
        "Pursuing comprehensive undergraduate studies focused on computational mathematics, data structures, machine learning architectures, statistical modeling, and algorithms. Actively collaborating with peers on research projects and tech societies.",
      tags: ["AI & Data Science", "B.Tech", "Undergraduate Studies"],
    },
    {
      id: "learning",
      category: "Technical Learning",
      title: "Core Foundations & Systems Architecture",
      subtitle: "Autonomous Skill Progression & Technical Mastery",
      period: "2024 — Present",
      icon: "book",
      description:
        "Rigorous deep-dive into programming paradigms, Data Structures & Algorithms, Python development, exploratory data analysis, machine learning pipelines, and modern responsive web engineering.",
      tags: [
        "Python",
        "DSA",
        "Data Science",
        "Machine Learning",
        "Web Engineering",
      ],
    },
    {
      id: "experience",
      category: "Practical Experience",
      title: "Hands-on Development & Problem-Solving",
      subtitle: "Hackathons, Collaborative Projects & Open Source",
      period: "2024 — Present",
      icon: "rocket",
      description:
        "Demonstrated technical execution through building real-world software: developer productivity tools, smart procurement logistics for agricultural communities, and public scheme accessibility tools. Active contributor on GitHub.",
      tags: [
        "Hackathons",
        "Open Source",
        "Real-World Solutions",
        "GitHub Dev",
      ],
    },
    {
      id: "applied-ai",
      category: "Emerging Exploration",
      title: "Applied AI & Next-Gen Intelligence",
      subtitle: "Agentic AI, LLM Integrations & Full-Stack Apps",
      period: "Ongoing Journey",
      icon: "sparkles",
      description:
        "Building autonomous agents, multi-modal applications, prompt engineering pipelines, and intelligent API orchestrations to translate state-of-the-art research into practical end-user applications.",
      tags: ["Generative AI", "LLM Orchestration", "Agentic Workflows"],
    },
  ],

  projects: [
    {
      id: "leetcode-sync",
      title: "LeetCode GitHub Sync",
      description:
        "A Chrome extension designed to automatically synchronize accepted LeetCode solutions with a personal GitHub repository using the GitHub REST API.",
      longDescription:
        "LeetCode GitHub Sync is a lightweight, background-driven browser extension built with Manifest V3 that streamlines competitive programmer workflows. It monitors submission events on LeetCode, parses accepted code and performance metrics, and automatically commits solutions directly to a designated GitHub repository with clean markdown documentation and directory structures.",
      image: "/images/leetcode_sync.jpg",
      containerBg: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
      techStack: [
        "JavaScript",
        "Chrome Extension Manifest V3",
        "GitHub REST API",
        "Chrome Storage API",
      ],
      problemStatement:
        "Developers practicing on LeetCode often forget to maintain their GitHub portfolios, manually copying and pasting accepted solutions which disrupts problem-solving focus and wastes valuable time.",
      proposedSolution:
        "An unobtrusive Chrome Extension that intercepts accepted submissions via DOM observers and network listeners, parses problem metadata, runtime stats, and memory percentiles, and commits cleanly to GitHub via authenticated REST API.",
      keyFeatures: [
        "Automatic zero-click synchronization upon LeetCode submission acceptance",
        "Smart commit naming (e.g., 'Solve Two Sum - Runtime: 42ms (Beat 95%)')",
        "Generates clean README markdown documentation with problem statement and tags",
        "Chrome Storage sync for secure personal access token management",
        "Modern dark mode status popup with live sync stats and commit heatmaps",
      ],
      githubUrl: "https://github.com/hiteshkumar-dev/leetcode-github-sync",
      liveUrl: "https://chromewebstore.google.com/detail/leetcode-github-sync",
    },
    {
      id: "krisora",
      title: "Krisora",
      description:
        "An AI-powered smart procurement and accessibility intelligence platform designed to improve procurement logistics, queue management, and accessibility for farmers in the North Eastern Region.",
      longDescription:
        "Krisora bridges the critical infrastructure and information gap for agricultural producers in hilly and remote regions of North East India. By combining geospatial GIS mapping, queue prediction algorithms, and local crop price intelligence, the platform enables farmers to plan dispatches efficiently, minimizing transit spoilage and long wait times at mandi procurement centers.",
      image: "/images/krisora.jpg",
      containerBg: "linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)",
      techStack: [
        "React / Next.js",
        "Python",
        "PostgreSQL",
        "PostGIS",
        "AI Integration",
        "Maps Integration",
      ],
      problemStatement:
        "Farmers in the North Eastern Region face harsh terrain, unpredictable transit delays, and severe queue bottlenecks at centralized procurement centers, leading to post-harvest decay and reduced earnings.",
      proposedSolution:
        "A full-stack intelligent procurement platform offering real-time mandi queue status, GIS-optimized transit routing, digital token issuance, and predictive AI dispatch scheduling.",
      keyFeatures: [
        "Interactive GIS procurement map of North East India with center capacity tracking",
        "AI queue forecasting model predicting wait times across 24 regional mandis",
        "Digital token queue system allowing farmers to schedule guaranteed drop-off slots",
        "Dynamic crop price analytics comparing real-time mandi rates vs MSP",
        "Bilingual and low-bandwidth optimized interface for remote connectivity",
      ],
      githubUrl: "https://github.com/hiteshkumar-dev/krisora-procurement",
      liveUrl: "https://krisora.vercel.app",
    },
    {
      id: "jansetu",
      title: "JanSetu",
      description:
        "An AI-powered scheme assistance concept designed to help users discover government schemes and understand eligibility requirements through an intelligent conversational interface.",
      longDescription:
        "JanSetu is an intelligent civic tech application that demystifies thousands of complex government welfare initiatives. Utilizing conversational AI and vector embeddings, citizens can state their demographic background and needs in simple language, receiving instant personalized eligibility evaluations, required document checklists, and direct guidance.",
      image: "/images/jansetu.svg",
      containerBg: "linear-gradient(135deg, #ccfbf1 0%, #5eead4 100%)",
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "AI Integration",
      ],
      problemStatement:
        "Welfare initiatives are fragmented across hundreds of government portals with bureaucratic jargon, making it challenging for eligible students, farmers, and small business owners to discover benefits they qualify for.",
      proposedSolution:
        "A conversational AI assistant backed by semantic vector search that matches user profiles to government scheme criteria with clear plain-language summaries and step-by-step application walkthroughs.",
      keyFeatures: [
        "Natural language AI conversational chatbot in regional languages",
        "Personalized eligibility scoring algorithm (94%+ accuracy matching)",
        "Automated document requirement checklist and DigiLocker integration guidance",
        "Categorized scheme discovery across Education, Agriculture, Healthcare, and Startups",
        "Instant PDF eligibility summary generator for offline application submission",
      ],
      githubUrl: "https://github.com/hiteshkumar-dev/jansetu-ai",
      liveUrl: "https://jansetu-ai.vercel.app",
    },
    {
      id: "blinkit-dashboard",
      title: "Blinkit Dashboard",
      description:
        "A data-driven dashboard project focused on presenting business information through interactive visualizations and an organized analytics interface.",
      longDescription:
        "Blinkit Dashboard is an interactive operations analytics portal tailored for quick-commerce dark store management. It aggregates live order velocities, delivery rider fleet statuses, inventory shelf turnover, and SLA adherence into a high-density, real-time command center.",
      image: "/images/blinkit_dashboard.svg",
      containerBg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "Data Visualization",
      ],
      problemStatement:
        "Managing 10-minute grocery delivery requires ultra-fast operational insights, where even a two-minute delay in picking or routing triggers cascading order SLA breaches.",
      proposedSolution:
        "A streamlined, zero-latency dashboard interface displaying real-time rider GPS metrics, hourly order volume curves, pick-and-pack performance, and category-level demand spikes.",
      keyFeatures: [
        "Real-time SLA adherence tracker with sub-10-minute countdown alerts",
        "Interactive hourly order velocity area chart with peak demand forecasting",
        "Live dark store rider dispatch monitor showing fleet availability ratio",
        "Aisle-by-aisle inventory turnover breakdown for fresh dairy and produce",
        "Fully responsive layout optimized for desktop command centers and mobile monitors",
      ],
      githubUrl: "https://github.com/hiteshkumar-dev/blinkit-analytics-dashboard",
      liveUrl: "https://blinkit-ops-analytics.vercel.app",
    },
  ],
};
