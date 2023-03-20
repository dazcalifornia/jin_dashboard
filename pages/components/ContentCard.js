import React from 'react'

const ContentCard = ({ title, image, description }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={image} alt={title} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">{title}</div>
          <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentCard

