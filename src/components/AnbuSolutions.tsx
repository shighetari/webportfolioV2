// src/components/AnbuSolutions.tsx
import React from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import StatCounter from "./StatCounter";
import CaseStudyAccordion from "./CaseStudyAccordion";
import { FaRocket, FaBrain, FaCode, FaShieldAlt, FaExternalLinkAlt, FaEnvelope, FaTrophy, FaClock, FaChartLine, FaUsers } from "react-icons/fa";
import { getTechIcon } from "../utils/techStackIcons";
import {
  heroVariants,
  heroContentVariants,
  heroItemVariants,
  achievementGridVariants,
  serviceGridVariants,
  serviceCardVariants,
  techGridVariants,
  techIconVariants,
  ctaVariants,
  buttonHoverVariants
} from "../utils/anbuAnimations";
import "../assets/scss/_AnbuSolutions.scss";

const AnbuSolutions: React.FC = () => {
  const services = [
    {
      icon: <FaBrain />,
      title: "AI Integration",
      description: "Plug AI into your existing systems without the headache. We handle LLMs, RAG, and custom models.",
      features: [
        "OpenAI, Anthropic, and custom integrations",
        "RAG systems for knowledge retrieval",
        "Model fine-tuning",
        "AI workflow automation"
      ]
    },
    {
      icon: <FaCode />,
      title: "SaaS Development",
      description: "Full-stack SaaS from scratch or feature additions to existing platforms. Secure, scalable, profitable.",
      features: [
        "Multi-tenant architecture",
        "Payment integrations (Stripe)",
        "Analytics dashboards",
        "White-label solutions"
      ]
    },
    {
      icon: <FaRocket />,
      title: "Fullstack Development",
      description: "Modern web apps built right. React frontends, solid backends, and databases that don't break.",
      features: [
        "React, Next.js, TypeScript",
        "Node.js, Python, Go",
        "RESTful and GraphQL APIs",
        "Database design & optimization"
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "DevOps & Cloud",
      description: "Deploy faster, break less. CI/CD pipelines, containerization, and cloud infrastructure that scales.",
      features: [
        "Docker & Kubernetes",
        "AWS, GCP, Azure",
        "Automated CI/CD",
        "Infrastructure as Code"
      ]
    }
  ];

  const achievements = [
    { end: 50, suffix: "+", label: "Projects Delivered", icon: <FaTrophy /> },
    { end: 99.9, suffix: "%", label: "Uptime SLA", icon: <FaChartLine /> },
    { end: 10, suffix: "K+", label: "Daily AI Requests", icon: <FaRocket /> },
    { end: 85, suffix: "%", label: "Avg. Time Savings", icon: <FaClock /> }
  ];

  const caseStudies = [
    {
      title: "Enterprise AI Platform",
      client: "Fortune 500 Company",
      category: "AI Integration",
      challenge: "20+ legacy systems needed AI integration without breaking everything.",
      solution: "Built modular platform with RAG and custom APIs to plug into existing infrastructure.",
      results: [
        "6 months → 3 weeks implementation time",
        "10K+ daily AI requests, 99.9% uptime",
        "Zero downtime during rollout"
      ]
    },
    {
      title: "Real-Time Analytics SaaS",
      client: "FinTech Startup",
      category: "SaaS Platform",
      challenge: "Handle 1M+ events/day with sub-200ms queries. Scale without breaking the bank.",
      solution: "Multi-tenant SaaS with TimescaleDB and serverless architecture.",
      results: [
        "1.5M events/day, <150ms response",
        "10 → 500+ clients in 8 months",
        "40% infrastructure cost reduction"
      ]
    }
  ];

  // Technology stack with icons
  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
    "OpenAI", "TensorFlow", "PyTorch", "LangChain",
    "Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Redis",
    "GraphQL", "FastAPI", "Terraform"
  ];

  return (
    <>
      <Navigation />
      <div className="anbu-solutions page-with-nav">

        {/* Hero Section - Compact & Animated */}
        <motion.section
          className="hero-section"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-content"
            variants={heroContentVariants}
          >
            <motion.h1 variants={heroItemVariants}>
              ANBU Solutions
            </motion.h1>
            <motion.p className="tagline" variants={heroItemVariants}>
              AI-Powered Software That Scales
            </motion.p>
            <motion.div className="hero-actions" variants={heroItemVariants}>
              <motion.a
                href="https://anbu.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Visit anbu.ai <FaExternalLinkAlt />
              </motion.a>
              <motion.a
                href="mailto:contact@anbu.ai"
                className="secondary-btn"
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <FaEnvelope /> Contact Us
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Achievements - Animated Stats */}
        <motion.section
          className="achievements-section"
          variants={achievementGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <StatCounter
                key={index}
                end={achievement.end}
                suffix={achievement.suffix}
                label={achievement.label}
                icon={achievement.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </motion.section>

        {/* Services - KEEPING THIS SECTION */}
        <section className="services-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The services that keep clients coming back
          </motion.p>
          <motion.div
            className="services-grid"
            variants={serviceGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={serviceCardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Case Studies - Compact Accordions */}
        <section className="case-studies-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recent Work
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real projects, real results
          </motion.p>
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <CaseStudyAccordion
                key={index}
                title={study.title}
                client={study.client}
                category={study.category}
                challenge={study.challenge}
                solution={study.solution}
                results={study.results}
              />
            ))}
          </div>
        </section>

        {/* Technology Stack - Icon Grid */}
        <section className="tech-stack-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technology Stack
          </motion.h2>
          <motion.div
            className="tech-icon-grid"
            variants={techGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {techStack.map((tech, index) => {
              const icon = getTechIcon(tech);
              return icon ? (
                <motion.div
                  key={index}
                  className="tech-icon-item"
                  variants={techIconVariants}
                  whileHover="hover"
                  title={tech}
                >
                  {icon}
                </motion.div>
              ) : null;
            })}
          </motion.div>
        </section>

        {/* CTA Section - Minimalist */}
        <motion.section
          className="cta-section"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Let's Build Something</h2>
          <motion.a
            href="mailto:contact@anbu.ai"
            className="cta-button"
            variants={buttonHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <FaEnvelope /> Get in Touch
          </motion.a>
        </motion.section>
      </div>
    </>
  );
};

export default AnbuSolutions;
