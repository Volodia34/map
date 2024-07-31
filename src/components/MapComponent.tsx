import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import SideMenu from './SideMenu';
import { useMarkers } from '../hooks/useMarkers';
import { MapComponentProps } from '../interfaces/MapComponent';
import L from 'leaflet';

const MapComponent: React.FC<MapComponentProps> = ({ userLocation }) => {
    const {
        markers,
        addMarker,
        updateMarker,
        deleteMarker,
        clearMarkers,
    } = useMarkers();

    const mapRef = useRef<L.Map | null>(null);

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                addMarker(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    const handleGoToMarker = (lat: number, lng: number) => {
        const map = mapRef.current;
        if (map) {
            map.flyTo([lat, lng], 13);
        }
    };

    const handleMarkerDelete = (e: React.MouseEvent, markerId: number) => {
        e.stopPropagation();
        deleteMarker(markerId);
    };

    return (
        <div className="main-container">
            <SideMenu
                markers={markers}
                onMarkerClick={handleGoToMarker}
                onDeleteMarker={deleteMarker}
                onClearMarkers={clearMarkers}
            />
            <div className="map-wrapper">
                <MapContainer center={userLocation} zoom={13} className="leaflet-container" ref={mapRef}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={[marker.lat, marker.lng]}
                            draggable={true}
                            eventHandlers={{
                                dragend: (e) => updateMarker(marker.id, e.target.getLatLng().lat, e.target.getLatLng().lng),
                            }}
                        >
                            <Popup>
                                {marker.name}
                                <button
                                    className="side-menu-button"
                                    onClick={(e) => handleMarkerDelete(e, marker.id)}
                                >
                                    Delete
                                </button>
                            </Popup>
                        </Marker>
                    ))}
                    <MapClickHandler />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
