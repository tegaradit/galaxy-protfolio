import React, { useState, useEffect, useRef } from 'react';

// Hook untuk intersection observer
const useIntersectionObserver = (elementRef, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasBeenVisible(true);
      } else {
        setIsIntersecting(false);
      }
    }, {
      threshold: 0.3,
      ...options
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [elementRef]);

  return { isIntersecting, hasBeenVisible };
};

// Section wrapper dengan animasi
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const sectionRef = useRef(null);
  const { isIntersecting, hasBeenVisible } = useIntersectionObserver(sectionRef);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        hasBeenVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-20 scale-95'
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;