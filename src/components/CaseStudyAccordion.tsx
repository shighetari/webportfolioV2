import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheckCircle } from 'react-icons/fa';

interface CaseStudyProps {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  category?: string;
}

const CaseStudyAccordion: React.FC<CaseStudyProps> = ({
  title,
  client,
  challenge,
  solution,
  results,
  category
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="case-study-accordion"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="accordion-header"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="header-content">
          <div className="title-section">
            <h3>{title}</h3>
            {category && <span className="category-badge">{category}</span>}
          </div>
          <p className="client-name">{client}</p>
        </div>
        <motion.div
          className="expand-icon"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="content-inner">
              <div className="study-block">
                <h4>Challenge</h4>
                <p>{challenge}</p>
              </div>

              <div className="study-block">
                <h4>Solution</h4>
                <p>{solution}</p>
              </div>

              <div className="study-block">
                <h4>Results</h4>
                <ul className="results-list">
                  {results.map((result, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <FaCheckCircle className="check-icon" />
                      {result}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(CaseStudyAccordion);
