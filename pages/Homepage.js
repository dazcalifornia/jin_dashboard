import React ,{useState,useEffect} from 'react';

import ContentCard from './components/ContentCard';
import Table from './components/Table';

const Homepage = () => {

  const data = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  ]
  return (
    <div className="container mx-auto">
      <Table data={data} />
      <ContentCard
        title="My Title"
        image="https://source.unsplash.com/random"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis magna velit. Duis ac posuere magna, vel feugiat nibh."
      />
    </div>
  );
}
export default Homepage;
