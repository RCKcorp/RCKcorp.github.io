import React, { useState } from 'react';

function Advertisement({ advertisement, updateAdvertisement, deleteAdvertisement, editMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdvertisement, setEditedAdvertisement] = useState({ ...advertisement });

  const handleChange = (e) => {
    setEditedAdvertisement({ ...editedAdvertisement, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateAdvertisement(advertisement.id, editedAdvertisement);
    setIsEditing(false);
  };

  return (
    <div className="advertisement">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editedAdvertisement.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            value={editedAdvertisement.image}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={editedAdvertisement.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            value={editedAdvertisement.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            value={editedAdvertisement.link}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </div>
      ) : (
        <div>
          <h3>{advertisement.name}</h3>
          <img src={advertisement.image} alt={advertisement.name} style={{ width: '100px' }} />
          <p>Prix: {advertisement.price}</p>
          <p>Adresse: {advertisement.address}</p>
          <a href={advertisement.link} target="_blank" rel="noopener noreferrer">
            Voir l'Annonce
          </a>
          {editMode && (
            <>
              <button onClick={() => setIsEditing(true)}>Modifier</button>
              <button onClick={() => deleteAdvertisement(advertisement.id)}>Supprimer</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Advertisement;
