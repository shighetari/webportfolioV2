// src/components/SEO.tsx
import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Francisco Barrios | Full Stack & AI Engineer",
  description = "I build AI-powered applications and SaaS products. 5+ years experience with React, Node.js, Python, and AI integrations. Founder of ANBU Solutions.",
  keywords = "Francisco Barrios, Full Stack Developer, AI Engineer, React, Node.js, Python, ANBU Solutions, AI Integration, SaaS, TypeScript",
  ogImage = "/images/og-image.png",
  ogUrl = "https://franciscobarrios.dev",
  twitterCard = "summary_large_image"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Francisco Barrios" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Francisco Barrios Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@developerbarrios" />

      {/* Additional SEO */}
      <link rel="canonical" href={ogUrl} />
      <meta name="theme-color" content="#6366f1" />

      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Francisco Barrios",
          "url": ogUrl,
          "image": ogImage,
          "sameAs": [
            "https://github.com/shighetari",
            "https://linkedin.com/in/developerbarrios"
          ],
          "jobTitle": "Full Stack Developer & AI/ML Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "ANBU Solutions",
            "url": "https://anbu.ai"
          },
          "knowsAbout": [
            "Full Stack Development",
            "AI/ML Engineering",
            "React",
            "Node.js",
            "Python",
            "TypeScript",
            "Cloud Computing",
            "DevOps",
            "AI Integration",
            "SaaS Development"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
