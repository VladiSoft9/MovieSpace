import React from 'react';
import { motion } from 'framer-motion';
import './AuroraBackground.css';

export const AuroraBackground = ({
  children,
}) => {
  return (
    <div className="aurora-container">
      <div className="aurora-background">
        {/* Main aurora glow */}
        <motion.div
          initial={{
            opacity: 0.4,
          }}
          animate={{
            opacity: 0.8,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="aurora-glow-primary"
        />
        
        {/* Secondary aurora wave */}
        <motion.div
          initial={{
            opacity: 0.3,
          }}
          animate={{
            opacity: 0.7,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          }}
          className="aurora-glow-secondary"
        />
      </div>

      <div className="aurora-content">{children}</div>
    </div>
  );
};
