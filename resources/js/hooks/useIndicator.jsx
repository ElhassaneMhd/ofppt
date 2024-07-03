import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export const useIndicator = (split, className = '') => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const ref = useRef(null);

  const currentTab = usePage().url.split(split)[1];

  useEffect(() => {
    const activeTabElement = ref.current?.querySelector(`[data-tab="${currentTab}"]`);

    const setIndicator = () => {
      if (activeTabElement) {
        const { offsetLeft: left, offsetWidth: width } = activeTabElement;
        setIndicatorStyle({ left, width });
      }
    };
    setIndicator();

    window.addEventListener('resize', setIndicator);
    return () => window.removeEventListener('resize', setIndicator);
  }, [currentTab]);

  return {
    ref,
    indicator: (
      <div
        className={`absolute -bottom-0.5 z-10 h-0.5 rounded-lg bg-primary transition-all duration-500 ${className}`}
        style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px` }}
      ></div>
    ),
  };
};
