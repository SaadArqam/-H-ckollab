import React from 'react';
import DeveloperCard from './DeveloperCard';

const DeveloperList = ({ developers }) => {
  if (!developers || developers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map((developer) => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </div>
  );
};

export default DeveloperList;
