
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

const ParallaxContainer = ({ children, offset = 50, className }: ParallaxContainerProps) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const { scrollY } = useScroll();
  
  const initial = elementTop - clientHeight;
  const final = elementTop + offset;
  
  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);

  useEffect(() => {
    const element = document.getElementById('parallax-container');
    if (element) {
      const onResize = () => {
        setElementTop(element.offsetTop);
        setClientHeight(window.innerHeight);
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <motion.div
      id="parallax-container"
      style={{ y: yRange }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxContainer;
