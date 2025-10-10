import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiExpress,
  SiFastapi,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiStripe,
  SiNginx,
  SiGit,
  SiGitlab,
  SiGithubactions,
  SiTerraform,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiSocketdotio,
  SiWebrtc,
  SiCloudflare,
  SiVite,
  SiWebpack,
  SiJest,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiSass,
  SiVercel,
  SiHeroku,
  SiSupabase,
  SiFirebase,
  SiFramer,
  SiVault,
} from 'react-icons/si';

import {
  FaChartLine,
  FaDatabase,
  FaCode,
  FaRobot,
  FaLock,
  FaCogs,
  FaServer,
  FaCloud,
} from 'react-icons/fa';

// Tech stack icon mapping
export const techStackIcons: Record<string, React.ReactElement> = {
  // Frontend
  'React': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'TypeScript': <SiTypescript />,
  'JavaScript': <SiJavascript />,
  'Redux': <SiRedux />,
  'Vite': <SiVite />,
  'Webpack': <SiWebpack />,
  'Tailwind CSS': <SiTailwindcss />,
  'SASS': <SiSass />,
  'Framer Motion': <SiFramer />,
  'React Router': <SiReactrouter />,

  // Backend
  'Node.js': <SiNodedotjs />,
  'Express': <SiExpress />,
  'Express.js': <SiExpress />,
  'FastAPI': <SiFastapi />,
  'Python': <SiPython />,
  'GraphQL': <SiGraphql />,

  // AI/ML
  'OpenAI': <SiOpenai />,
  'OpenAI API': <SiOpenai />,
  'TensorFlow': <SiTensorflow />,
  'PyTorch': <SiPytorch />,
  'LangChain': <FaRobot />,
  'Transformers': <FaRobot />,

  // Databases
  'MongoDB': <SiMongodb />,
  'PostgreSQL': <SiPostgresql />,
  'Redis': <SiRedis />,
  'DynamoDB': <FaDatabase />,
  'TimescaleDB': <FaDatabase />,
  'ChromaDB': <FaDatabase />,
  'Pinecone': <FaDatabase />,

  // DevOps & Cloud
  'Docker': <SiDocker />,
  'Kubernetes': <SiKubernetes />,
  'AWS': <SiAmazonaws />,
  'AWS Lambda': <SiAmazonaws />,
  'AWS ECS': <SiAmazonaws />,
  'AWS S3': <SiAmazonaws />,
  'Vercel': <SiVercel />,
  'Heroku': <SiHeroku />,
  'Nginx': <SiNginx />,
  'Cloudflare': <SiCloudflare />,

  // CI/CD & Infrastructure
  'GitLab CI': <SiGitlab />,
  'GitHub Actions': <SiGithubactions />,
  'Terraform': <SiTerraform />,
  'Ansible': <SiAnsible />,
  'Prometheus': <SiPrometheus />,
  'Grafana': <SiGrafana />,
  'ArgoCD': <FaCogs />,
  'Vault': <SiVault />,

  // Real-time & Communication
  'WebSockets': <SiSocketdotio />,
  'Socket.io': <SiSocketdotio />,
  'WebRTC': <SiWebrtc />,

  // Testing & Tools
  'Jest': <SiJest />,
  'Git': <SiGit />,

  // Payment & Services
  'Stripe': <SiStripe />,

  // Other Services
  'Supabase': <SiSupabase />,
  'Firebase': <SiFirebase />,
  'Chart.js': <FaChartLine />,
  'Canvas API': <FaCode />,

  // Security & Misc
  'JWT': <FaLock />,
  'bcrypt': <FaLock />,
  'Kali Linux': <FaLock />,
  'Burp Suite': <FaLock />,
  'OWASP ZAP': <FaLock />,
  'Metasploit': <FaLock />,
  'Nmap': <FaLock />,
  'SQLMap': <FaLock />,

  // Generic fallbacks
  'knex': <FaDatabase />,
  'Celery': <FaServer />,
  'RabbitMQ': <FaServer />,
  'Tesseract OCR': <FaRobot />,
  'spaCy': <FaRobot />,
};

// Get icon for a technology
export const getTechIcon = (techName: string): React.ReactElement | null => {
  // Try exact match first
  if (techStackIcons[techName]) {
    return techStackIcons[techName];
  }

  // Try case-insensitive match
  const lowerTechName = techName.toLowerCase();
  const foundKey = Object.keys(techStackIcons).find(
    key => key.toLowerCase() === lowerTechName
  );

  if (foundKey) {
    return techStackIcons[foundKey];
  }

  // No icon found
  return null;
};
