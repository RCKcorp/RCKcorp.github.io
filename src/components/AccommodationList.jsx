import React from 'react';
import Advertisement from './Advertisement';

function AccommodationList({ accommodations, updateAdvertisement, deleteAdvertisement, editMode }) {
  return (
    <div className="advertisement-list">
      {accommodations.map((accommodation) => (
        <Advertisement
          key={accommodation.id}
          advertisement={accommodation}
          updateAdvertisement={updateAdvertisement}
          deleteAdvertisement={deleteAdvertisement}
          editMode={editMode}
        />
      ))}
    </div>
  );
}

export default AccommodationList;
