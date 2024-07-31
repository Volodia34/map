import { useState, useEffect } from 'react';
import { ref, set, onValue, remove } from 'firebase/database';
import { database } from '../utils/firebaseConfig';

interface Marker {
    id: number;
    lat: number;
    lng: number;
    timestamp: string;
}

export const useMarkers = () => {
    const [markers, setMarkers] = useState<Marker[]>([]);

    useEffect(() => {
        const markersRef = ref(database, 'markers/');
        onValue(markersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMarkers(Object.values(data));
            }
        });
    }, []);

    const addMarker = (lat: number, lng: number) => {
        const newMarker = {
            id: markers.length + 1,
            lat,
            lng,
            timestamp: new Date().toISOString(),
        };
        set(ref(database, `markers/${newMarker.id}`), newMarker);
    };

    const updateMarker = (id: number, lat: number, lng: number) => {
        set(ref(database, `markers/${id}`), { id, lat, lng, timestamp: new Date().toISOString() });
    };

    const deleteMarker = (id: number) => {
        remove(ref(database, `markers/${id}`));
    };

    const clearMarkers = () => {
        remove(ref(database, 'markers/'));
    };

    return {
        markers,
        addMarker,
        updateMarker,
        deleteMarker,
        clearMarkers,
    };
};
