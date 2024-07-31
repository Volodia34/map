import { useState, useEffect } from 'react';
import { ref, set, onValue, remove } from 'firebase/database';
import { database } from '../utils/firebaseConfig';

interface Marker {
    id: number;
    name: string;
    lat: number;
    lng: number;
    timestamp: string;
}

export const useMarkers = () => {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        const markersRef = ref(database, 'markers/');
        onValue(markersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const markersArray = Object.values(data) as Marker[];
                setMarkers(markersArray);
                const highestId = Math.max(...markersArray.map(marker => marker.id), 0);
                setNextId(highestId + 1);
            }
        });
    }, []);

    const addMarker = (lat: number, lng: number) => {
        const newMarker = {
            id: nextId,
            name: `Marker ${nextId}`,
            lat,
            lng,
            timestamp: new Date().toISOString(),
        };
        set(ref(database, `markers/${newMarker.id}`), newMarker);
        setNextId(nextId + 1);
    };

    const updateMarker = (id: number, lat: number, lng: number) => {
        const marker = markers.find(marker => marker.id === id);
        if (marker) {
            set(ref(database, `markers/${id}`), { ...marker, lat, lng, timestamp: new Date().toISOString() });
        }
    };

    const deleteMarker = (id: number) => {
        remove(ref(database, `markers/${id}`)).then(() => {
            const updatedMarkers = markers.filter(marker => marker.id !== id).map((marker, index) => ({
                ...marker,
                id: index + 1,
                name: `Marker ${index + 1}`
            }));
            setMarkers(updatedMarkers);
            updatedMarkers.forEach(marker => {
                set(ref(database, `markers/${marker.id}`), marker);
            });
            setNextId(updatedMarkers.length + 1);
        });
    };

    const clearMarkers = () => {
        remove(ref(database, 'markers/')).then(() => {
            setMarkers([]);
            setNextId(1);
        });
    };

    return {
        markers,
        addMarker,
        updateMarker,
        deleteMarker,
        clearMarkers,
    };
};
