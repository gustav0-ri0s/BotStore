import React from 'react';

interface IconProps {
  className?: string;
}

const StoreIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.64M12 14.25v7.5m0-7.5L4.5 21m0-7.5L12 3m0 0 7.5 7.5M12 3L4.5 10.5m7.5-7.5V14.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25M3.375 19.5A1.125 1.125 0 0 1 2.25 18.375V6.375A1.125 1.125 0 0 1 3.375 5.25h17.25A1.125 1.125 0 0 1 21.75 6.375v12a1.125 1.125 0 0 1-1.125 1.125M3.375 5.25L12 12l8.625-6.75" />
 </svg>
);
// This is a more typical store icon. 
// The previous AdminIcon was: M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.64m-13.5 0L12 14.25v7.5M12 14.25L4.5 21M12 14.25l7.5 6.75M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125V6.375m1.125 13.125V6.375m0 0A1.125 1.125 0 0 1 4.5 5.25h15A1.125 1.125 0 0 1 20.625 6.375m0 0v13.125m0-13.125L12 3m8.625 3.375L12 3m0 0L3.375 6.375

export default StoreIcon;