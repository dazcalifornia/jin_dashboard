import { useState } from 'react';

const SelectSectionModal = ({ onSelectSection }) => {
  const [section, setSection] = useState('');

  const handleSelectSection = () => {
    onSelectSection(section);
  };

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Select Section</h3>
      <div className="mt-4">
        <label htmlFor="section" className="block text-sm font-medium text-gray-700">
          Section
        </label>
        <input
          type="text"
          name="section"
          id="section"
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSelectSection}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SelectSectionModal;

