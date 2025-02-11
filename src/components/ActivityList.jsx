import React from 'react';
import Advertisement from './Advertisement';

function ActivityList({ activities, updateAdvertisement, deleteAdvertisement, editMode }) {
  return (
    <div className="advertisement-list">
      {activities.map((activity) => (
        <Advertisement
          key={activity.id}
          advertisement={activity}
          updateAdvertisement={updateAdvertisement}
          deleteAdvertisement={deleteAdvertisement}
          editMode={editMode}
        />
      ))}
    </div>
  );
}

export default ActivityList;
