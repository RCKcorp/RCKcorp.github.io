import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AccommodationList from './components/AccommodationList';
import ActivityList from './components/ActivityList';
import AddAdvertisementForm from './components/AddAdvertisementForm';
import './App.css';
import { getAdvertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement } from './firebase';

function App() {
  const [accommodations, setAccommodations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [adType, setAdType] = useState('accommodation');
  const [activePage, setActivePage] = useState('accommodation');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadAdvertisements(activePage);
  }, [activePage]);

  const loadAdvertisements = async (pageType) => {
    const adType = pageType === 'accommodation' ? 'accommodation' : 'activity';
    const advertisements = await getAdvertisements(adType);
    if (adType === 'accommodation') {
      setAccommodations(advertisements);
    } else {
      setActivities(advertisements);
    }
  };

  const handleAddAdvertisement = async (advertisement) => {
    const newAdvertisement = await addAdvertisement(adType, advertisement);
    if (adType === 'accommodation') {
      setAccommodations([...accommodations, newAdvertisement]);
    } else {
      setActivities([...activities, newAdvertisement]);
    }
    setShowAddForm(false);
  };

  const handleUpdateAdvertisement = async (id, updatedAdvertisement) => {
    await updateAdvertisement(adType, id, updatedAdvertisement);
    if (adType === 'accommodation') {
      setAccommodations(
        accommodations.map((accommodation) =>
          accommodation.id === id ? { ...updatedAdvertisement, id } : accommodation
        )
      );
    } else {
      setActivities(
        activities.map((activity) =>
          activity.id === id ? { ...updatedAdvertisement, id } : activity
        )
      );
    }
  };

  const handleDeleteAdvertisement = async (id) => {
    await deleteAdvertisement(adType, id);
    if (adType === 'accommodation') {
      setAccommodations(accommodations.filter((accommodation) => accommodation.id !== id));
    } else {
      setActivities(activities.filter((activity) => activity.id !== id));
    }
  };

  return (
    <div className="app-container">
      <div className="menu">
        <h2>Menu</h2>
        <ul>
          <li
            className={activePage === 'accommodation' ? 'active' : ''}
            onClick={() => {
              setActivePage('accommodation');
              setAdType('accommodation');
            }}
          >
            Hébergements
          </li>
          <li
            className={activePage === 'activity' ? 'active' : ''}
            onClick={() => {
              setActivePage('activity');
              setAdType('activity');
            }}
          >
            Activités
          </li>
          <li onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Voir' : 'Modifier'}
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Planificateur de Vacances</h1>

        <h2>{activePage === 'accommodation' ? 'Hébergements' : 'Activités'}</h2>
        {activePage === 'accommodation' ? (
          <AccommodationList
            accommodations={accommodations}
            updateAdvertisement={handleUpdateAdvertisement}
            deleteAdvertisement={handleDeleteAdvertisement}
            editMode={editMode}
          />
        ) : (
          <ActivityList
            activities={activities}
            updateAdvertisement={handleUpdateAdvertisement}
            deleteAdvertisement={handleDeleteAdvertisement}
            editMode={editMode}
          />
        )}

        <button onClick={() => setShowAddForm(true)}>Ajouter une Publicité</button>

        {showAddForm && (
          <AddAdvertisementForm
            addAdvertisement={handleAddAdvertisement}
            onCancel={() => setShowAddForm(false)}
            adType={adType}
          />
        )}
      </div>
    </div>
  );
}

export default App;
