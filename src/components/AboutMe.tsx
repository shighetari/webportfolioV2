// src/components/AboutMe.tsx
import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import Navigation from "./Navigation";
import profilePic from "/icons/linux-tux-svgrepo-com.svg";
import "../assets/scss/_AboutMe.scss";
import { FaGithub, FaLinkedin, FaEnvelope, FaCheckCircle, FaBriefcase, FaCode, FaUsers } from "react-icons/fa";

type SkillInfo = {
  name: string;
  level: number;
  years: number;
};

const SKILLS_DATA: Record<string, { skills: SkillInfo[] }> = {
  "AI & ML": {
    skills: [
      { name: "OpenAI & Anthropic APIs", level: 95, years: 2 },
      { name: "LangChain & RAG", level: 90, years: 1.5 },
      { name: "TensorFlow & PyTorch", level: 85, years: 2 },
      { name: "Fine-tuning & Prompt Engineering", level: 90, years: 2 }
    ]
  },
  Frontend: {
    skills: [
      { name: "React & Next.js", level: 95, years: 5 },
      { name: "TypeScript", level: 95, years: 4 },
      { name: "Three.js & WebGL", level: 85, years: 2 },
      { name: "Redux & State Management", level: 90, years: 4 }
    ]
  },
  Backend: {
    skills: [
      { name: "Node.js & Express", level: 95, years: 5 },
      { name: "Python & FastAPI", level: 90, years: 3 },
      { name: "PostgreSQL & MongoDB", level: 90, years: 5 },
      { name: "GraphQL & REST APIs", level: 95, years: 5 }
    ]
  },
  DevOps: {
    skills: [
      { name: "Docker & Kubernetes", level: 90, years: 4 },
      { name: "AWS & Cloud Platforms", level: 85, years: 4 },
      { name: "CI/CD (GitLab, GitHub Actions)", level: 90, years: 4 },
      { name: "Terraform & IaC", level: 85, years: 3 }
    ]
  },
  Security: {
    skills: [
      { name: "Web Application Security", level: 85, years: 3 },
      { name: "Penetration Testing", level: 80, years: 2 },
      { name: "Security Best Practices", level: 90, years: 5 },
      { name: "Kali Linux & Tools", level: 80, years: 2 }
    ]
  }
};

const SKILLS_CATEGORY_META: Record<
  string,
  {
    headline: string;
    summary: string;
    tools: string[];
    outcome: string;
  }
> = {
  "AI & ML": {
    headline: "LLM Systems & Retrieval",
    summary: "Design and deploy AI agents, RAG search, and evaluation loops for production workloads.",
    tools: ["OpenAI / Groq", "LangChain", "Vector DBs"],
    outcome: "Ships enterprise-grade assistants in weeks, not months."
  },
  Frontend: {
    headline: "Interfaces with Intent",
    summary: "Build highly interactive apps with strong UX, accessibility, and motion craft.",
    tools: ["React / Next.js", "TypeScript", "Framer Motion"],
    outcome: "Delivers performant experiences across desktop and mobile."
  },
  Backend: {
    headline: "APIs & Data Systems",
    summary: "Architect resilient services, GraphQL/REST APIs, and data pipelines that scale with demand.",
    tools: ["Node.js / Python", "PostgreSQL", "MongoDB"],
    outcome: "Keeps critical paths fast, observable, and secure."
  },
  DevOps: {
    headline: "Platform & Delivery",
    summary: "Automate infrastructure, observability, and deployments to keep teams shipping confidently.",
    tools: ["Docker / K8s", "GitHub / GitLab CI", "Terraform"],
    outcome: "Reduces release friction with reliable pipelines and IaC."
  },
  Security: {
    headline: "Security by Default",
    summary: "Integrate security reviews, threat modeling, and response plans into the product lifecycle.",
    tools: ["OWASP Practices", "Pentesting Tooling", "Secure Auth"],
    outcome: "Builds trust with hardened apps and proactive monitoring."
  }
};

const AboutMe = () => {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation variants with reduced motion support
  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }
    }
  };

  const achievements = [
    { icon: <FaBriefcase />, number: "50+", label: "Projects Delivered", color: "#6366f1" },
    { icon: <FaCode />, number: "5+", label: "Years Experience", color: "#a855f7" },
    { icon: <FaUsers />, number: "20+", label: "Happy Clients", color: "#10b981" },
    { icon: <FaCheckCircle />, number: "99.9%", label: "Success Rate", color: "#f59e0b" }
  ];

  const timeline = [
    {
      year: "2024 - Present",
      title: "Founder & Lead Engineer",
      company: "ANBU Solutions",
      description: "AI platforms and SaaS products. LLM integrations, RAG systems, and microservices.",
      achievements: [
        "20+ enterprise clients on ANBU AI platform",
        "Months → weeks AI implementation time",
        "99.9% uptime across all services"
      ]
    },
    {
      year: "2023 - 2024",
      title: "Senior Full Stack Developer",
      company: "Freelance & Contract",
      description: "Web apps, AI integrations, and DevOps for various clients.",
      achievements: [
        "15+ production applications shipped",
        "60% avg. performance improvement",
        "85% faster deployments via CI/CD"
      ]
    },
    {
      year: "2020 - 2023",
      title: "Full Stack Developer",
      company: "Various Companies",
      description: "Web applications with modern tech stacks. Scalable architecture and solid UX.",
      achievements: [
        "Multiple open-source contributions",
        "10+ client-facing apps led",
        "Mentored junior devs"
      ]
    }
  ];

  const skillCategories = useMemo(() => ["All", ...Object.keys(SKILLS_DATA)], []);

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(SKILLS_DATA).map(([category, data]) => [category, data.skills.length])
      ),
    []
  );

  const totalSkills = useMemo(
    () => Object.values(categoryCounts).reduce((sum, count) => sum + count, 0),
    [categoryCounts]
  );

  const skillSummaries = useMemo(
    () =>
      Object.entries(SKILLS_DATA).map(([category, data]) => {
        const meta = SKILLS_CATEGORY_META[category] ?? {
          headline: "",
          summary: "",
          tools: data.skills.slice(0, 3).map(skill => skill.name),
          outcome: ""
        };

        const averageLevel = Math.round(
          data.skills.reduce((acc, skill) => acc + skill.level, 0) / data.skills.length
        );

        return {
          category,
          averageLevel,
          ...meta
        };
      }),
    []
  );

  const getFilteredSkills = () => {
    if (selectedSkillCategory === "All") {
      return Object.entries(SKILLS_DATA).flatMap(([category, data]) =>
        data.skills.map(skill => ({ ...skill, category }))
      );
    }
    const categorySkills =
      SKILLS_DATA[selectedSkillCategory as keyof typeof SKILLS_DATA]?.skills ?? [];
    return categorySkills.map(skill => ({
      ...skill,
      category: selectedSkillCategory
    }));
  };

  return (
    <>
      <Navigation />
      <main className="about-me page-with-nav" ref={containerRef}>

        {/* Hero Section */}
        <motion.section
          className="about-me-hero"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          aria-label="Introduction"
        >
          <motion.img
            src={profilePic}
            alt="Francisco Barrios - Full Stack Developer"
            className="about-me-photo"
            whileHover={shouldReduceMotion ? {} : {
              scale: 1.05,
              rotate: 5,
              transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
          />
          <motion.div
            className="hero-content"
            variants={fadeIn}
          >
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              Francisco Barrios
            </motion.h1>
            <motion.p
              className="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              Full Stack Developer | AI/ML Engineer | Founder @ ANBU Solutions
            </motion.p>
            <motion.div
              className="availability-badge"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.6, type: shouldReduceMotion ? "tween" : "spring", stiffness: 200 }}
              role="status"
              aria-live="polite"
            >
              <span className="status-indicator" aria-hidden="true"></span>
              Available for Hire - Open to Opportunities
            </motion.div>
            <motion.p
              className="bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              I build AI-powered applications and scalable software. Started ANBU Solutions in 2024 to help businesses
              integrate AI without the hassle. Before that, spent 5 years shipping production apps for clients across
              industries. I work with React, Node.js, Python, and whatever else gets the job done.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="achievements-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          aria-label="Professional Achievements"
        >
          <motion.div className="achievements-grid" variants={staggerContainer} role="list">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                style={{ borderColor: achievement.color }}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.05,
                  y: -10,
                  boxShadow: `0 15px 35px ${achievement.color}30`,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                role="listitem"
              >
                <motion.div
                  className="achievement-icon"
                  style={{ color: achievement.color }}
                  whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                  aria-hidden="true"
                >
                  {achievement.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                >
                  {achievement.number}
                </motion.h3>
                <p>{achievement.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Professional Timeline */}
        <motion.section
          className="timeline-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="timeline-heading"
        >
          <motion.h2
            id="timeline-heading"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            Professional Journey
          </motion.h2>
          <div className="timeline" role="list">
            {timeline.map((item, index) => (
              <motion.article
                key={index}
                className="timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideInLeft}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.2 }}
                role="listitem"
              >
                <motion.div
                  className="timeline-marker"
                  initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : {
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  aria-hidden="true"
                ></motion.div>
                <motion.div
                  className="timeline-content"
                  whileHover={shouldReduceMotion ? {} : {
                    x: 15,
                    boxShadow: "0 12px 30px rgba(99, 102, 241, 0.2)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                  <motion.ul
                    className="timeline-achievements"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    aria-label="Key achievements"
                  >
                    {item.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        variants={fadeIn}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Technical Skills */}
        <motion.section
          className="skills-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="skills-heading"
        >
          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            className="skills-lead"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            A snapshot of the capabilities I bring to product teams—from AI platforms to secure delivery.
          </motion.p>
          <motion.div
            className="skills-summary"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            role="list"
          >
            {skillSummaries.map(summary => (
              <motion.article
                key={summary.category}
                className="skills-summary-card"
                variants={fadeInUp}
                role="listitem"
              >
                <header className="summary-header">
                  <h3>{summary.category}</h3>
                  <span className="summary-average">{summary.averageLevel}% avg proficiency</span>
                </header>
                <p className="summary-headline">{summary.headline}</p>
                <p className="summary-body">{summary.summary}</p>
                <ul className="summary-tools" aria-label={`${summary.category} primary tools`}>
                  {summary.tools.map(tool => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <p className="summary-outcome">{summary.outcome}</p>
              </motion.article>
            ))}
          </motion.div>
          <motion.div
            className="skill-filters"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            role="tablist"
            aria-label="Skill category filters"
          >
            {skillCategories.map(category => (
              <motion.button
                key={category}
                className={`filter-btn ${selectedSkillCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedSkillCategory(category)}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                role="tab"
                aria-selected={selectedSkillCategory === category}
                aria-controls="skills-panel"
                aria-label={`${category} skills (${category === "All" ? totalSkills : categoryCounts[category] ?? 0})`}
              >
                <span className="filter-label">{category}</span>
                <span className="filter-meta">
                  {category === "All" ? totalSkills : categoryCounts[category] ?? 0}
                </span>
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            id="skills-panel"
            className="skills-list"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={selectedSkillCategory}
            role="tabpanel"
            aria-label={`${selectedSkillCategory} skills`}
          >
            {getFilteredSkills().map((skill, index) => (
              <motion.div
                key={index}
                className="skill-item"
                variants={fadeInUp}
                whileHover={shouldReduceMotion ? {} : {
                  y: -5,
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.15)",
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-years">{skill.years}+ years</span>
                </div>
                <div className="skill-bar-container" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : {
                      duration: 1,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <span className="skill-level">{skill.level}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="contact-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          aria-labelledby="contact-heading"
        >
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="contact-intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            Working on something interesting? Need help with a project? Let's talk.
          </motion.p>
          <motion.nav
            className="contact-links"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Contact links"
          >
            <motion.a
              href="https://github.com/shighetari"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)",
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label="Visit my GitHub profile"
            >
              <FaGithub aria-hidden="true" /> GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/developerbarrios/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)",
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label="Connect with me on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </motion.a>
            <motion.a
              href="mailto:contact@franciscobarrios.dev"
              className="contact-link"
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)",
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label="Send me an email"
            >
              <FaEnvelope aria-hidden="true" /> Email Me
            </motion.a>
          </motion.nav>
        </motion.section>
      </main>
    </>
  );
};

export default AboutMe;
