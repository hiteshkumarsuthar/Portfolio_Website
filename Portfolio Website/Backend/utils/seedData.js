const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Journey = require("../models/Journey");
const Project = require("../models/Project");
const ContactInfo = require("../models/ContactInfo");
const SiteSettings = require("../models/SiteSettings");

async function seedDatabase() {
  try {
    // 1. Admin User
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      await Admin.create({
        email: "admin@portfolio.com",
        password: hashedPassword,
        name: "Hitesh Kumar",
        role: "Administrator",
        avatar: "/images/profile.jpg",
      });
      console.log("Default Admin created: admin@portfolio.com / admin123");
    }

    // 2. Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: "Hitesh Kumar",
        role: "AI & Data Science Developer",
        subtitle: "AI & Data Science Developer",
        bio: "I'm a B.Tech student specializing in Artificial Intelligence and Data Science, passionate about building intelligent applications, exploring emerging technologies, and solving real-world problems through code.",
        detailedBio:
          "I am an aspiring AI engineer and developer pursuing a B.Tech degree with deep passion for generative AI, agentic architectures, and modern web application development. I love building practical systems that bridge research and end users.",
        profileImage: "/images/profile.jpg",
        resumeUrl: "",
        availabilityStatus: "AVAILABLE FOR OPPORTUNITIES",
        careerObjective:
          "To engineer intelligent, high-impact machine learning systems and scalable applications that solve real-world problems.",
        educationSummary:
          "Bachelor of Technology (B.Tech) in AI & Data Science (2025 — 2029)",
        currentWorkingStatus: "Undergraduate Student & Independent Developer",
        interests: [
          "Artificial Intelligence",
          "Machine Learning",
          "Data Science",
          "Full-Stack Web Development",
          "Agentic Systems",
        ],
      });
      console.log("Default Profile initialized.");
    }

    // 3. Technical Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const initialSkills = [
        // Programming & Development
        { name: "Python", category: "Programming & Development", proficiency: 92, icon: "code", order: 1 },
        { name: "Java", category: "Programming & Development", proficiency: 80, icon: "code", order: 2 },
        { name: "JavaScript", category: "Programming & Development", proficiency: 88, icon: "code", order: 3 },
        { name: "HTML5", category: "Programming & Development", proficiency: 95, icon: "code", order: 4 },
        { name: "CSS3", category: "Programming & Development", proficiency: 90, icon: "code", order: 5 },
        { name: "React", category: "Programming & Development", proficiency: 88, icon: "code", order: 6 },
        { name: "Git", category: "Programming & Development", proficiency: 85, icon: "code", order: 7 },
        { name: "GitHub", category: "Programming & Development", proficiency: 88, icon: "code", order: 8 },

        // Data Science & Analytics
        { name: "NumPy", category: "Data Science & Analytics", proficiency: 89, icon: "chart", order: 9 },
        { name: "Pandas", category: "Data Science & Analytics", proficiency: 90, icon: "chart", order: 10 },
        { name: "Matplotlib", category: "Data Science & Analytics", proficiency: 85, icon: "chart", order: 11 },
        { name: "Seaborn", category: "Data Science & Analytics", proficiency: 84, icon: "chart", order: 12 },
        { name: "Jupyter Notebook", category: "Data Science & Analytics", proficiency: 92, icon: "chart", order: 13 },
        { name: "SQL", category: "Data Science & Analytics", proficiency: 82, icon: "chart", order: 14 },
        { name: "Machine Learning", category: "Data Science & Analytics", proficiency: 86, icon: "chart", order: 15 },

        // AI & Emerging Technologies
        { name: "Generative AI", category: "AI & Emerging Technologies", proficiency: 90, icon: "brain", order: 16 },
        { name: "LLMs", category: "AI & Emerging Technologies", proficiency: 88, icon: "brain", order: 17 },
        { name: "Prompt Engineering", category: "AI & Emerging Technologies", proficiency: 92, icon: "brain", order: 18 },
        { name: "AI Agents", category: "AI & Emerging Technologies", proficiency: 85, icon: "brain", order: 19 },
        { name: "OpenAI API", category: "AI & Emerging Technologies", proficiency: 89, icon: "brain", order: 20 },
      ];
      await Skill.insertMany(initialSkills);
      console.log(`Seeded ${initialSkills.length} Technical Skills.`);
    }

    // 4. Journey Timeline
    const journeyCount = await Journey.countDocuments();
    if (journeyCount === 0) {
      const initialJourney = [
        {
          title: "Bachelor of Technology (B.Tech)",
          subtitle: "Specialization in Artificial Intelligence & Data Science",
          organization: "Engineering University",
          category: "Current Education",
          period: "2025 — 2029 (Expected)",
          icon: "graduation",
          description:
            "Pursuing comprehensive undergraduate studies focused on computational mathematics, data structures, machine learning architectures, statistical modeling, and algorithms. Actively collaborating with peers on research projects and tech societies.",
          tags: ["AI & Data Science", "B.Tech", "Undergraduate Studies"],
          order: 1,
        },
        {
          title: "Core Foundations & Systems Architecture",
          subtitle: "Autonomous Skill Progression & Technical Mastery",
          organization: "Self-Directed Learning",
          category: "Technical Learning",
          period: "2024 — Present",
          icon: "book",
          description:
            "Rigorous deep-dive into programming paradigms, Data Structures & Algorithms, Python development, exploratory data analysis, machine learning pipelines, and modern responsive web engineering.",
          tags: ["Python", "DSA", "Data Science", "Machine Learning", "Web Engineering"],
          order: 2,
        },
        {
          title: "Hands-on Development & Problem-Solving",
          subtitle: "Hackathons, Collaborative Projects & Open Source",
          organization: "Developer Community",
          category: "Practical Experience",
          period: "2024 — Present",
          icon: "rocket",
          description:
            "Demonstrated technical execution through building real-world software: developer productivity tools, smart procurement logistics for agricultural communities, and public scheme accessibility tools. Active contributor on GitHub.",
          tags: ["Hackathons", "Open Source", "Real-World Solutions", "GitHub Dev"],
          order: 3,
        },
        {
          title: "Applied AI & Next-Gen Intelligence",
          subtitle: "Agentic AI, LLM Integrations & Full-Stack Apps",
          organization: "AI Exploration",
          category: "Emerging Exploration",
          period: "Ongoing Journey",
          icon: "sparkles",
          description:
            "Building autonomous agents, multi-modal applications, prompt engineering pipelines, and intelligent API orchestrations to translate state-of-the-art research into practical end-user applications.",
          tags: ["Generative AI", "LLM Orchestration", "Agentic Workflows"],
          order: 4,
        },
      ];
      await Journey.insertMany(initialJourney);
      console.log(`Seeded ${initialJourney.length} Journey Milestones.`);
    }

    // 5. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const initialProjects = [
        {
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
          category: "Developer Tools",
          isFeatured: true,
          isPublished: true,
          order: 1,
        },
        {
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
          category: "AI & Agriculture",
          isFeatured: true,
          isPublished: true,
          order: 2,
        },
        {
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
          category: "Civic AI",
          isFeatured: true,
          isPublished: true,
          order: 3,
        },
        {
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
          category: "Analytics & Dashboards",
          isFeatured: true,
          isPublished: true,
          order: 4,
        },
      ];
      await Project.insertMany(initialProjects);
      console.log(`Seeded ${initialProjects.length} Projects.`);
    }

    // 6. Contact Info
    const contactCount = await ContactInfo.countDocuments();
    if (contactCount === 0) {
      await ContactInfo.create({
        email: "hiteshkumar.techdev@gmail.com",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
        location: "India",
        github: "https://github.com/hiteshkumar-dev",
        linkedin: "https://linkedin.com/in/hiteshkumar-ai",
        twitter: "https://twitter.com/hiteshkumar_ai",
        heading: "Contact Me",
        subtitle:
          "Got a project waiting to be realized? Let's collaborate and make it happen!",
      });
      console.log("Default ContactInfo initialized.");
    }

    // 7. Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        siteTitle: "Hitesh Kumar | AI & Data Science Developer Portfolio",
        metaDescription:
          "Portfolio of Hitesh Kumar, an AI & Data Science Developer and B.Tech student specializing in machine learning, full-stack development, and intelligent web applications.",
        metaKeywords:
          "Hitesh Kumar, AI Developer, Data Science, Machine Learning, Full Stack Developer, React, Python, Portfolio",
        themePreference: "dark",
      });
      console.log("Default SiteSettings initialized.");
    }
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

module.exports = seedDatabase;
