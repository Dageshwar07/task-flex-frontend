import { useState, useEffect } from 'react';

export const useCountUp = (endValue, duration = 2000, startValue = 0) => {
  const [count, setCount] = useState(startValue);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(startValue + (endValue - startValue) * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, startValue]);
  
  return count;
};