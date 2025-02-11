import React, { useState } from 'react';

function AddAdvertisementForm({ addAdvertisement, onCancel, adType }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addAdvertisement({
      name,
      image,
      price: parseFloat(price),
      address,
      link,
    });
    setName('');
    setImage('');
    setPrice('');
    setAddress('');
    setLink('');
  };

  return (
    <div className="add-advertisement-form">
      <h2>Ajouter un Nouveau {adType === 'accommodation' ? 'Hébergement' : 'Activité'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Lien de l'Image:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <label>
          Prix:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Adresse:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Lien de l'Annonce:
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
        </label>
        <button type="submit">Ajouter une Publicité</button>
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </form>
    </div>
  );
}

export default AddAdvertisementForm;
