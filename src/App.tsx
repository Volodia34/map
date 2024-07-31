import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import "./App.css";

const App = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [locationError, setLocationError] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLocationError(true);
                }
            );
        } else {
            setLocationError(true);
        }
    }, []);

    const defaultLocation: [number, number] = [51.505, -0.09];

    return (
        <div className="app">
            <h1 className="app-title">Map Quest Markers</h1>
            <div className="map-container">
                {locationError ? (
                    <MapComponent userLocation={defaultLocation} />
                ) : userLocation ? (
                    <MapComponent userLocation={userLocation} />
                ) : (
                    <p className="loading-message">Loading your location...</p>
                )}
            </div>
        </div>
    );
};

export default App;
