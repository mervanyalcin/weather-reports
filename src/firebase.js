// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { allCitiesHandle, currentCityHandle } from "./utils";

const firebaseConfig = {
  apiKey: "AIzaSyDhGIMShn4nP5O045-ZFOg6vMNj-X2Bg7s",
  authDomain: "weather-project-9b153.firebaseapp.com",
  projectId: "weather-project-9b153",
  storageBucket: "weather-project-9b153.appspot.com",
  messagingSenderId: "445735899248",
  appId: "1:445735899248:web:682f6243141f6a483824b5",
  measurementId: "G-Z59W5BP5L0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export const getDailyDatas = async (today) => {
  try {
    const colRef = query(collection(db, today), orderBy("city", "asc"));
    const snapshots = await getDocs(colRef);

    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    allCitiesHandle(docs);
  } catch (err) {
    console.log(err.code);
  }
};

export const getCurrentCity = async (currentCityName, today) => {
  try {
    const colRef = query(
      collection(db, today),
      where("city", "==", currentCityName)
    );
    const snapshots = await getDocs(colRef);

    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });

    currentCityHandle(docs);
  } catch (err) {
    console.log(err.code);
  }
};
