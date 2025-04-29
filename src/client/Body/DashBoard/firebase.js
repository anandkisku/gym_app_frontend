// Import necessary Firestore functions from Firebase SDK v9+
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmJDHZB4TSAv1GjxVfXlWe7HSNA8D2iFQ",
  authDomain: "mygym-9ab4d.firebaseapp.com",
  projectId: "mygym-9ab4d",
  storageBucket: "mygym-9ab4d.firebasestorage.app",
  messagingSenderId: "568861182178",
  appId: "1:568861182178:web:0d31ca91dc86176a27f6bb",
  measurementId: "G-S1R4GHX74Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db to be used in other parts of your app
export { db };

// Optional: If you want to export the fetchData function as well
// This is typically used in a component where you want to fetch data
export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "members"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};
