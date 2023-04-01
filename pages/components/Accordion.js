import { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <div
        className="flex justify-between items-center px-4 py-2 bg-gray-200 cursor-pointer"
        onClick={handleToggle}
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isExpanded && (
        <div className="px-4 py-2">{children}</div>
      )}
    </div>
  );
};

export default Accordion;

