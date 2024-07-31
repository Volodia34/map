// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDD3DHup2dY9OIpgORSxnBzGDzr2UmSo4k",
    authDomain: "map-marker-47f7f.firebaseapp.com",
    databaseURL: "https://map-marker-47f7f-default-rtdb.firebaseio.com",
    projectId: "map-marker-47f7f",
    storageBucket: "map-marker-47f7f.appspot.com",
    messagingSenderId: "336544219907",
    appId: "1:336544219907:web:f4cdf86b8416aba3185f36",
    measurementId: "G-LSNZCG7XE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
