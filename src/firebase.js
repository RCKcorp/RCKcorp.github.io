// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// TODO: Replace with your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEFYIlWDJdK_SxtvAamjppc-a6JWbxqk8",
  authDomain: "viviproject-3c512.firebaseapp.com",
  projectId: "viviproject-3c512",
  storageBucket: "viviproject-3c512.firebasestorage.app",
  messagingSenderId: "245682631941",
  appId: "1:245682631941:web:c2f5c78a1cd3437092f36c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper functions to interact with Firestore
const getAdvertisements = async (adType) => {
  const collectionName = adType === 'accommodation' ? 'accommodations' : 'activities';
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addAdvertisement = async (adType, advertisement) => {
  const collectionName = adType === 'accommodation' ? 'accommodations' : 'activities';
  const docRef = await addDoc(collection(db, collectionName), advertisement);
  return { id: docRef.id, ...advertisement };
};

const updateAdvertisement = async (adType, id, updatedAdvertisement) => {
  const collectionName = adType === 'accommodation' ? 'accommodations' : 'activities';
  const adDoc = doc(db, collectionName, id);
  await updateDoc(adDoc, updatedAdvertisement);
};

const deleteAdvertisement = async (adType, id) => {
  const collectionName = adType === 'accommodation' ? 'accommodations' : 'activities';
  const adDoc = doc(db, collectionName, id);
  await deleteDoc(adDoc);
};

export { db, getAdvertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement };
