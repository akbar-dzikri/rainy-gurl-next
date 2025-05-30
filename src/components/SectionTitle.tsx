import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-3xl sm:text-4xl font-bold text-white text-center mb-10 md:mb-16 ${className}`}
      style={{ textShadow: "1px 1px 2px #ff69b4, 2px 2px 5px #00000055" }}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
