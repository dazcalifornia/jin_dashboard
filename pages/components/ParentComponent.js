import { useState } from 'react';
import Modal from './Modal';
import CourseInfo from './CourseInfo';
import SelectSectionModal from './SelectSectionModal';

const ParentComponent = () => {
  const [isSelectSectionModalOpen, setIsSelectSectionModalOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState('');

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setIsSelectSectionModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsSelectSectionModalOpen(false);
  };

  return (
    <>
      {isSelectSectionModalOpen && (
        <Modal open={true} onClose={handleCloseModal}>
          <SelectSectionModal onSelectSection={handleSelectSection} />
        </Modal>
      )}
      {!isSelectSectionModalOpen && (
        <CourseInfo section={selectedSection} />
      )}
    </>
  );
};

export default ParentComponent;

