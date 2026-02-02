// src/components/AboutMe.tsx
import React, { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import Navigation from "./Navigation";
import profilePic from "/icons/linux-tux-svgrepo-com.svg";
import "../assets/scss/_AboutMe.scss";
import { FaBriefcase, FaShieldAlt, FaServer, FaBrain } from "react-icons/fa";



const AboutMe = () => {

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



  const timeline = [
    {
      year: "2025 - Present",
      title: "Founder / Software Engineer",
      company: "ANBU Solutions",
      description: "Ship client-facing web apps and internal tools in React/TypeScript. Build REST APIs in Node.js and Java/Spring. Use LLM tooling to accelerate work sequences.",
      achievements: [
        "Shipped client-facing web apps",
        "Implemented Auth (JWT/OAuth2)",
        "Accelerated dev with LLM tooling"
      ]
    },
    {
      year: "2024 - 2025",
      title: "Cybersecurity & AI Instructor",
      company: "Eastwick College",
      description: "Taught hands-on cybersecurity and AI/LLM fundamentals. Created React/TypeScript classroom demos and led compliance-focused training for staff.",
      achievements: [
        "Taught AI/LLM & Cybersecurity",
        "Created React/TS classroom demos",
        "Led compliance training for 50+ staff"
      ]
    },
    {
      year: "2023 - 2024",
      title: "Assistant DBA",
      company: "Lexir LLC",
      description: "Assisted SQL Server migrations to Azure. Validated cutovers with minimal downtime and supported query troubleshooting and performance tuning.",
      achievements: [
        "Assisted migrations to Azure",
        "Validated cutovers (3-5 min downtime)",
        "Tuned query performance"
      ]
    },
    {
      year: "2023",
      title: "Contract Web Developer",
      company: "Centro Inc",
      description: "Built and enhanced public website sections. Contributed to a successful $750K government funding outcome by aligning pages to program guidelines.",
      achievements: [
        "Contributed to $750K funding outcome",
        "Cut marketing costs by ~$10K via AI",
        "Enhanced accessibility & UI"
      ]
    },
    {
      year: "2021 - 2023",
      title: "Full-Stack Software Engineer",
      company: "Xorfox LLC",
      description: "Built healthcare app features with Angular/TypeScript and Java/Spring Boot. Refactored UI components and integrated Keycloak SSO for regulated workflows.",
      achievements: [
        "Built healthcare app features",
        "Integrated Keycloak SSO",
        "Streamlined CI/CD (Jenkins + Docker)"
      ]
    },
    {
      year: "2013 - 2019",
      title: "Lead Officer, Security Operations",
      company: "Dell Technologies RSA",
      description: "Led teams in a high-compliance enterprise environment. Maintained 24/7 coverage, produced audit-ready reports, and enforced access-control procedures.",
      achievements: [
        "Led high-compliance security ops",
        "Maintained 24/7 incident readiness",
        "Produced audit-ready documentation"
      ]
    }
  ];



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
            <motion.div
              className="achievement-card"
              style={{ borderColor: "#a855f7" }}
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -10,
                boxShadow: `0 15px 35px #a855f730`,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              role="listitem"
            >
              <motion.div
                className="achievement-icon"
                style={{ color: "#a855f7" }}
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                aria-hidden="true"
              >
                <FaBriefcase />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
              >
                15+
              </motion.h3>
              <p>Production Apps</p>
            </motion.div>

            <motion.div
              className="achievement-card"
              style={{ borderColor: "#6366f1" }}
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -10,
                boxShadow: `0 15px 35px #6366f130`,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              role="listitem"
            >
              <motion.div
                className="achievement-icon"
                style={{ color: "#6366f1" }}
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                aria-hidden="true"
              >
                <FaServer />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                style={{ fontSize: "1.5rem" }}
              >
                Scalable
              </motion.h3>
              <p>Systems</p>
            </motion.div>

            <motion.div
              className="achievement-card"
              style={{ borderColor: "#10b981" }}
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -10,
                boxShadow: `0 15px 35px #10b98130`,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              role="listitem"
            >
              <motion.div
                className="achievement-icon"
                style={{ color: "#10b981" }}
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                aria-hidden="true"
              >
                <FaBrain />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                style={{ fontSize: "1.5rem" }}
              >
                AI Powered
              </motion.h3>
              <p>Solutions</p>
            </motion.div>

            <motion.div
              className="achievement-card"
              style={{ borderColor: "#f59e0b" }}
              variants={scaleIn}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -10,
                boxShadow: `0 15px 35px #f59e0b30`,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              role="listitem"
            >
              <motion.div
                className="achievement-icon"
                style={{ color: "#f59e0b" }}
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                aria-hidden="true"
              >
                <FaShieldAlt />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                style={{ fontSize: "1.5rem" }}
              >
                Secure
              </motion.h3>
              <p>Architecture</p>
            </motion.div>
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
          <motion.div className="contact-links" variants={staggerContainer} role="list">
            {/* Contact links will be rendered here later */}
          </motion.div>
        </motion.section>
      </main>
    </>
  );
};

export default AboutMe;
