import React, { useState } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    onClose()
  }

  return (
    <>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-md p-6 z-50">
              <div className="flex justify-end">
                <button onClick={handleCloseModal}>
                  <svg className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Modal

